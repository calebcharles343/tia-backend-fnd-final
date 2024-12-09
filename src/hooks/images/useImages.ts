import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Imagedata } from "../../interfaces";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchImages(headers: Record<string, string>) {
  const {
    data: images,
    isLoading: isFetchingImages,
    isError,
    error,
    refetch: refetchImages,
  } = useQuery<Imagedata, FetchError>({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await axios.get(
        "http://127.0.0.1:5003/api/v1/e-commerce/images",
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

  return { images, isFetchingImages, isError, error, refetchImages };
}
