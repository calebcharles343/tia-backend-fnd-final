import Product from "./Product";
import { useFetchProducts } from "./useFetchProducts";

export default function Products() {
  const { products, isLoadingProducts } = useFetchProducts();
  console.log(products?.data);

  return (
    <div>
      <div className=" w-full">
        <ul className=" w-[1000px] grid grid-cols-3">
          {products?.data.map((product) => (
            <Product product={product} />
          ))}
        </ul>
      </div>

      <div className=""></div>
    </div>
  );
}
