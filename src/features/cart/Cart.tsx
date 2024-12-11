import { ItemType, CartType } from "../../interfaces";
import { addItem, removeItem } from "../../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import cartImg3 from "../../data/img/cart.png";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart); // state.cart will be of type CartType
  const dispatch = useDispatch();

  console.log(cart, "xx❌");

  const handleAddItem = (item: ItemType) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (productId: number | string) => {
    dispatch(removeItem(productId));
  };

  const handleSendCart = async () => {
    try {
      const response = await fetch("http://your-backend-url/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.items }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Cart sent to backend:", data);
      } else {
        console.error("Failed to send cart to backend:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending cart to backend:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-full max-w-2xl h-full mx-auto mt-4 p-4 bg-gray-800 text-white rounded-lg border-2 border-[#FFA82B] bg-cover bg-center bg-no-repeat shadow-lg"
      style={{ backgroundImage: `url(${cartImg3})` }}
    >
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.items.map((item: ItemType) => (
          <div
            key={item.productId}
            className="flex flex-col bg-gray-700 p-2 rounded-lg shadow-md text-sm"
          >
            {/* <p className="font-semibold">Product ID: {item.productId}</p> */}
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Total Price: ${item.price * item.quantity}</p>
            <button
              onClick={() => handleRemoveItem(item.productId)}
              className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-lg font-bold text-gray-700 bg-gray-50  p-2 rounded-lg">
          Grand Total: ${cart.totalPrice.toFixed(2)}
        </p>
        <button
          onClick={handleSendCart}
          className="mt-4 bg-[#FFA82B] text-gray-800 py-2 px-4 rounded-lg hover:bg-[#e6951f]"
        >
          Make Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
