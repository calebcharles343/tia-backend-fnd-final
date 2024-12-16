import { useParams } from "react-router-dom";
import useGetProduct from "../copies/product/useGetProduct";
import Product from "../features/product/Product";

import { useFetchProducts } from "../features/product/useFetchProducts";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoadingProduct } = useGetProduct(Number(id));
  const { products, isLoadingProducts } = useFetchProducts();

  const mainProduct = !product?.data ? products?.data[0] : product?.data;

  console.log();

  if (isLoadingProduct && isLoadingProducts) return <p>Loading</p>;
  if (products?.data.length === 0 && !product?.data)
    return <p>No product to display</p>;
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 ">
      <Product product={mainProduct} />

      <div className="absolute border  bottom-[-160px] scale-125  border-gray-300 w-[250px] min-h-20 rounded-lg p-2">
        <h1 className={`text-center font-bold`}>PRODUCT DETAILS</h1>
        {mainProduct?.description}
      </div>
    </div>
  );
}
