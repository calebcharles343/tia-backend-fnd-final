import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUploadImage(headers: Record<string, string>) {
  const queryClient = useQueryClient();

  const {
    mutate: uploadImage,
    isPending: isUploading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.put(
        "http://127.0.0.1:5002/api/v1/e-commerce/images",
        formData,
        { headers }
      );
      return response.data; // Assuming response contains the uploaded image URL or key
    },
    onSuccess: () => {
      // Invalidate user query to refetch data
      // queryClient.invalidateQueries(["user"] as any);
    },
    onError: () => {
      console.error("An error occurred while uploading the file.");
    },
  });

  return { uploadImage, isUploading, isError, error };
}
