import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ImageUrls {
  urls: string[];
}

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchImages(headers: Record<string, string>) {
  const {
    data: images,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ImageUrls, FetchError>({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await axios.get(
        "https://backend-aws-a3-bucket.onrender.com/images",
        {
          headers,
        }
      );
      return response.data;
    },
  });

  // Handle errors
  if (isError && error) {
    const errorMessage =
      error.response?.data.message ||
      "An error occurred while fetching images.";
    console.error("Fetch Images Error:", errorMessage);
  }

  return { images, isLoading, isError, error, refetch };
}
