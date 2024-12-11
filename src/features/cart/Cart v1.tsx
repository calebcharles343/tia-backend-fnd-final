import { ItemType } from "../../interfaces";
import useProductStore from "../../store/productStore";

import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  const storedUserJSON = localStorage.getItem("localUser");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
      console.log(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }

  const { cart, addItemToCart, removeItemFromCart, sendCartToBackend } =
    useProductStore();

  console.log(cart);

  const handleRemoveItem = (productId: number | string) => {
    removeItemFromCart(productId);
  };

  const handleSendCart = async () => {
    await sendCartToBackend();
  };

  return (
    <div className="flex flex-col cw-full mt-4 p-4 bg-gray-800 text-white rounded-lg border-[2px] border-[#FFA82B]">
      <h1>Shopping Cart</h1>
      {cart.items.map((item: ItemType) => (
        <div key={item.productId}>
          <p>Product ID: {item.productId}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemoveItem(item.productId)}>
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleSendCart}
        className="mt-auto border border-[#FFA82B]  rounded-lg"
      >
        Make order
      </button>
    </div>
  );
}
