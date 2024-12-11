import Products from "../features/Product/Products";
import Cart from "../features/cart/Cart";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[80%_20%] py-4 h-screen px-12 gap-4">
      <Products />
      <Cart />
    </div>
  );
}
