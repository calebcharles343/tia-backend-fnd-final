import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login as loginApi } from "../../services/apiAuth";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { authStore } from "../../store/authStore";

interface LoginT {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useLogin() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = authStore();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }: LoginT) => loginApi(email, password),

    onSuccess: (data) => {
      if (data.status === 200) {
        const userData = data.data.user;

        queryClient.setQueryData(["user"], userData); // Update React Query cache
        console.log("❌❌", userData);

        setUser(userData); // Sync with Zustand store

        Cookies.set("jwt", data.data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        navigate("/home", { replace: true });
      } else {
        setErrorMessage(data.message);
        console.error("Login Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      const error = err.response?.data.message || "An error occurred";
      setErrorMessage(error);
      console.error("Login Error:", error);
    },
  });

  return { login, isPending, isError, errorMessage };
}
