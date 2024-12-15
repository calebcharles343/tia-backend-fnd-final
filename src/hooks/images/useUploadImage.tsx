import { useState } from "react";
import axios from "axios";
import { Mutation } from "@tanstack/react-query";

export interface Headers {
  [key: string]: string;
  authorization: string;
}

export default function useMutation() {
  const [state, setState] = useState<Mutation>({
    isLoading: false,
    error: null,
  });

  const fn = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data: any,
    headers?: Headers
  ) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const res = await axios({
        url,
        method,
        data,
        headers,
      });
      console.log(res);
      setState({ isLoading: false, error: null });
    } catch (error: any) {
      setState({
        isLoading: false,
        error: error?.message || "An unknown error occurred",
      });
    }
  };

  return { mutate: fn, ...state };
}
