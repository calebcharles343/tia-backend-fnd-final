import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

interface UploadError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUploadImage(headers: Record<string, string>) {
  const queryClient = useQueryClient();

  const {
    mutate: uploadImage,
    isPending: isUploading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        "https://backend-aws-a3-bucket.onrender.com/images",
        formData,
        {
          headers,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch images query to update the list of images
      queryClient.invalidateQueries(["images"] as any);
    },
    onError: (err: UploadError) => {
      const errorMessage =
        err.response?.data.message ||
        "An error occurred while uploading the image.";
      console.error("Upload Error:", errorMessage);
    },
  });

  return { uploadImage, isUploading, isError, error };
}
