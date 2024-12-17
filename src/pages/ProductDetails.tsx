import { useParams } from "react-router-dom";
import useGetProduct from "../copies/product/useGetProduct";
import Product from "../features/product/Product";
import { useFetchProducts } from "../features/product/useFetchProducts";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoadingProduct } = useGetProduct(Number(id));
  const { products, isLoadingProducts } = useFetchProducts();

  const mainProduct = !product?.data ? products?.data[0] : product?.data;

  if (isLoadingProduct && isLoadingProducts) return <p>Loading</p>;
  if (products?.data.length === 0 && !product?.data)
    return <p>No product to display</p>;

  return (
    <div className=" flex flex-col mid:flex-row items-center justify-center mt-20 scale-125  gap-8">
      <Product product={mainProduct} />
      <div className=" min-h-[360px] border border-gray-300 w-[250px] rounded-lg p-2">
        <h1 className="text-center font-bold">PRODUCT DETAILS</h1>
        <p>{mainProduct?.description}</p>
      </div>
    </div>
  );
}
