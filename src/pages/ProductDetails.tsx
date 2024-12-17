import { useParams } from "react-router-dom";
import useGetProduct from "../copies/product/useGetProduct";
import Product from "../features/product/Product";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  let ID;
  const firstProduct = JSON.parse(localStorage.getItem("firstProduct") || "{}");

  ID = Number(id) || Number(firstProduct.id);

  const { product, isLoadingProduct } = useGetProduct(ID);

  if (isLoadingProduct) return <p>Loading...</p>;

  if (!product?.data) {
    return <p>No product to display</p>;
  }

  const mainProduct = product?.data || firstProduct;

  return (
    <div className=" flex flex-col items-center md:flex-row md:justify-center w-full gap-8 overflow-y-auto">
      <Product product={mainProduct} />
      <div className="h-full max-h-[425px] border border-gray-300 w-[250px] rounded-lg p-2">
        <h1 className="text-center font-bold">PRODUCT DESCRIPTION</h1>
        <p>{mainProduct?.description}</p>
      </div>
    </div>
  );
}
