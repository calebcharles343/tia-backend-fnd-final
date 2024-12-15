import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Imagedata, ProductsType } from "../../interfaces";
import { getAllProducts } from "../../services/apiProducts";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchProducts() {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useQuery<ProductsType, FetchError>({
    queryKey: ["products"],
    queryFn: getAllProducts,
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
