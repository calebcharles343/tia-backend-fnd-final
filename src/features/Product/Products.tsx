import Product from "./Product";
import { useFetchProducts } from "./useFetchProducts";

export default function Products() {
  const { products, isLoadingProducts } = useFetchProducts();
  console.log(products?.data);

  return (
    <div className="w-[1000px] p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full">
        {products?.data.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

{
  /* <ul className="grid grid-cols-3 w-[111rem] gap-[2.916666rem] mb-12 mt-[3.8rem] :grid-cols-2 :max-w-[76.8rem] tablet:gap-4 tablet:px-16 mobile:flex mobile:flex-col mobile:justify-center mobile:items-center mobile:max-w-full mobile:px-4">
  {products?.data.map((product) => (
    <Product key={product.id} product={product} />
  ))}
</ul>; */
}
