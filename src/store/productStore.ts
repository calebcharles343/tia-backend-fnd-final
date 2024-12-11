// productStore.ts
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import axios from "axios";

export interface CartType {
  items: ItemType[];
}

export interface ItemType {
  productId: number | string;
  quantity: number | string;
}

interface ProductStore {
  cart: CartType;
  setCart: (cart: CartType) => void;
  addItemToCart: (item: ItemType) => void;
  removeItemFromCart: (productId: number | string) => void;
  sendCartToBackend: () => Promise<void>;
}

type MyPersist = (
  config: StateCreator<ProductStore>,
  options: PersistOptions<ProductStore>
) => StateCreator<ProductStore>;

const createProductStore = (userId: string) =>
  create<ProductStore>(
    (persist as MyPersist)(
      (set, get) => ({
        cart: { items: [] }, // Default state

        setCart: (cart) => set({ cart }),

        addItemToCart: (item) => {
          const { cart } = get();
          const existingItemIndex = cart.items.findIndex(
            (i) => i.productId === item.productId
          );

          if (existingItemIndex !== -1) {
            // Update the quantity of the existing item
            const updatedItems = cart.items.map((i, index) =>
              index === existingItemIndex
                ? { ...i, quantity: Number(i.quantity) + Number(item.quantity) }
                : i
            );
            set({ cart: { items: updatedItems } });
          } else {
            // Add the new item to the cart
            set({ cart: { items: [...cart.items, item] } });
          }
        },

        removeItemFromCart: (productId) => {
          const { cart } = get();
          const updatedItems = cart.items.filter(
            (item) => item.productId !== productId
          );
          set({ cart: { items: updatedItems } });
        },

        sendCartToBackend: async () => {
          const { cart } = get();
          const payload = { items: cart.items };

          try {
            const response = await axios.post(
              "http://your-backend-url/api/cart",
              payload
            );
            console.log("Cart sent to backend:", response.data);
          } catch (error) {
            console.error("Error sending cart to backend:", error);
          }
        },
      }),
      {
        name: `productStore-${userId}`, // Dynamic persistent store key based on userId
        onRehydrateStorage: () => (state) => {
          console.log("Rehydrated state:", state);
        },
      }
    )
  );

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

const userId = storedUser?.id;
const useProductStore = createProductStore(userId);

export default useProductStore;
