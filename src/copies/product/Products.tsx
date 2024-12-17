import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetchProducts } from "./useFetchProducts";
import Product from "./Product";
import { setProducts } from "../../store/productsSlice"; // Import Redux action
import { ProductType } from "../../interfaces";

export default function Products() {
  const dispatch = useDispatch();

  // Fetch products using React Query
  const { products, isLoadingProducts, refetchProducts } = useFetchProducts();

  // Select products from Redux store
  const storeProducts = useSelector((state: any) => state.products.products); // Replace `any` with the root state type if defined

  useEffect(() => {
    // Refetch products on component mount
    refetchProducts();
  }, [refetchProducts]);

  useEffect(() => {
    // Update Redux store when products data changes
    if (products?.data) {
      dispatch(setProducts(products.data));
    }
  }, [products, dispatch]);

  if (isLoadingProducts) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex flex-col item p-4 min-w-full md:min-w-[400px] bg-red-700">
      <ul className="grid grid-cols-1 mid:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 sm:items-center">
        {products?.data.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
