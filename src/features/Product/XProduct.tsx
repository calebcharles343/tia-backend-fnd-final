import { ChangeEvent, useEffect, useState } from "react";
import { ItemType, ProductType } from "../../interfaces";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
interface ProductProps {
  product: ProductType;
}
export default function Product({ product }: ProductProps) {
  const [itemQuantity, setitemQuantity] = useState<number>(0);
  console.log(product.id);

  const storedUserJSON = localStorage.getItem("localUser");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }
  const dispatch = useDispatch();
  const handleAddItem = (item: ItemType) => {
    dispatch(addItem(item));
  };
  const handleAddQtr = () => {
    setitemQuantity(itemQuantity + 1);
  };
  const handleReduceQtr = () => {
    if (itemQuantity > 0) setitemQuantity(itemQuantity - 1);
  };

  useEffect(() => {
    setitemQuantity(0);
  }, []);

  const handleUpload = (e: ChangeEvent, id: number) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col w-full max-w-[300px] min-h-[300px] max-h-[300px] border border-[#FFA82B] p-4 gap-2 shadow-xl rounded-lg">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
        {product.name}
      </p>
      <img
        src={product.avatar}
        alt={`Image of ${product.name}`}
        className="w-full h-auto mb-auto rounded-lg"
      />
      <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
        <div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl">
            ${product.price}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span>qtr {itemQuantity}</span>
            <button onClick={handleReduceQtr} className="p-1 border rounded">
              -
            </button>
            <button onClick={handleAddQtr} className="p-1 border rounded">
              +
            </button>
          </div>
        </div>
        <button
          className="flex text-xs mt-2 sm:mt-0 p-1 border rounded"
          onClick={() =>
            handleAddItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: itemQuantity,
            })
          }
        >
          Add to Cart
        </button>
      </div>

      {storedUser?.role === "Admin" && (
        <div className="flex items-center justify-between md:w-[250px] gap-2 mt-2 sm:mt-0 border=">
          <div className="bg-white rounded-md p-1">
            <input
              id="imageInput"
              type="file"
              className="hidden"
              onChange={(e) => handleUpload(e, product.id)}
            />
            <label
              htmlFor="imageInput"
              className="flex items-center justify-center text-xs border border-solid p-1 rounded-lg cursor-pointer w-22 md:w-16 sm:w-12"
            >
              {/* {isUploading ? "..." : "photo +"} */}
            </label>
          </div>
          <button className="text-xs p-1 border rounded">Edit product</button>
          <button className="text-xs p-1 border rounded">delete</button>
        </div>
      )}
    </div>
  );
}
