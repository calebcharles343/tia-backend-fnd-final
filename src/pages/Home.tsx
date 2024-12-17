import Products from "../features/product/Products";
import Cart from "../features/cart/Cart";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] py-4 h-full px-12 gap-4 overflow-y-scroll">
      <Products />
      <div className="hidden lg:block">
        <Cart />
      </div>
    </div>
  );
}
