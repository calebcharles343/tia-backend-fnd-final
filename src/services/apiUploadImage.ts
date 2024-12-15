import axios from "axios";

export const uploadImageApi = async (
  formData: FormData,
  headers: Record<string, string>
) => {
  const response = await axios.put(
    `https://tia-backend-final.onrender.com/api/v1/e-commerce/images`,
    formData,
    {
      headers,
    }
  );
  return response.data;
};
