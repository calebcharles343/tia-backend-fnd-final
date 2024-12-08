import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

interface DeleteError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  const { mutate: deleteImage, isPending: isDeleting } = useMutation({
    mutationFn: async (keyMain: string) => {
      const [userId, key] = keyMain.split("/");
      await axios.delete(
        `https://backend-aws-a3-bucket.onrender.com/images/${userId}/${key}`
      );
    },

    onSuccess: () => {
      // Invalidate and refetch images query
      queryClient.invalidateQueries(["images"] as any);
    },

    onError: (err: DeleteError) => {
      // Handle the error gracefully
      const error = err.response?.data.message || "An error occurred";
      console.error("Delete Error:", error);
    },
  });

  return { deleteImage, isDeleting };
}
