import { useEffect } from "react";
import { useFetchProducts } from "./useFetchProducts";
import Product from "./product";

export default function Products() {
  const { products, isLoadingProducts, refetchProducts } = useFetchProducts();

  useEffect(() => {
    refetchProducts();
  }, []);

  return (
    <div className="p-4 w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {products?.data.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
