import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Imagedata, ProductsType } from "../../interfaces";
import Cookies from "js-cookie";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchProducts() {
  const authToken = Cookies.get("jwt");
  const headers = { authorization: `Bearer ${authToken}` };

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useQuery<ProductsType, FetchError>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        "http://127.0.0.1:5002/api/v1/e-commerce/products",
        {
          headers,
        }
      );

      return response.data;
    },
  });

  // Handle errors
  if (isErrorProducts && errorProducts) {
    const errorMessage =
      errorProducts.response?.data.message ||
      "An error occurred while fetching images.";
    console.error("Fetch Images Error:", errorMessage);
  }

  return {
    products,
    isLoadingProducts,
    isErrorProducts,
    errorProducts,
    refetchProducts,
  };
}
