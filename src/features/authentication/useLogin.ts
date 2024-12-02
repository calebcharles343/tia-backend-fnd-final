// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { login as loginApi } from "../../services/apiAuth";

interface LoginT {
  email: string;
  password: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: LoginT) => loginApi(email, password),

    onSuccess: (data) => {
      // Update cached user data
      queryClient.setQueryData(["user"], data.user);

      // Store JWT in a cookie
      Cookies.set("jwt", data.token, { expires: 7 });

      // Redirect after successful login
      navigate("/home", { replace: true });
    },

    onError: (err: any) => {
      console.error("Login Error:", err);
      // Optionally display error messages (e.g., using a toast)
    },
  });

  return { login, isPending, isError, error };
}
