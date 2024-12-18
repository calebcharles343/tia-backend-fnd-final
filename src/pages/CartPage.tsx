import Cart from "../features/cart/Cart";

export default function CartPage() {
  return (
    <div className=" flex flex-col items-center w-full">
      <div className="w-full  mid:w-[400px] lg:w-[600px]">
        <Cart />
      </div>
    </div>
  );
}
