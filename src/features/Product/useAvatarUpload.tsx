import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UploadImageParams {
  productId: number;
  file: File;
  authToken: string | undefined;
}

export function useAvatarUpload() {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    productId,
    file,
    authToken,
  }: UploadImageParams) => {
    const formData = new FormData();
    formData.append("image", file);

    const headers = {
      "x-product-id": `productAvatar-${productId}`,
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${authToken}`,
    };

    const response = await axios.put(
      "http://127.0.0.1:5002/api/v1/e-commerce/images",
      formData,
      { headers }
    );
    return response.data;
  };

  const mutationOptions = {
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"] as any);
    },
  };

  const {
    mutate: useUploadAvatar,
    isPending,
    isError,
    error,
  } = useMutation<unknown, Error, UploadImageParams>(mutationOptions);

  return { useUploadAvatar, isPending, isError, error };
}
