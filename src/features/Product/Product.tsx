import { ChangeEvent, useState } from "react";
import { ProductType } from "../../interfaces";
import Cookies from "js-cookie";
import { QueryClient } from "@tanstack/react-query";
import { useUploadImage } from "../../hooks/images/useUploadImage";
import { useFetchProducts } from "./useFetchProducts";

interface ProductProps {
  product: ProductType;
}
const authToken = Cookies.get("jwt");

export default function Product({ product }: ProductProps) {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const { refetchProducts } = useFetchProducts();

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

  const { uploadImage, isUploading } = useUploadImage({
    "x-product-id": `userProduct-${product?.id}`,
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${authToken}`,
  });

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        setErrorFile("File must be in JPG, JPEG, or PNG format.");
        return;
      }
      setErrorFile("");

      const formData = new FormData();
      formData.append("image", file);

      // Upload image
      uploadImage(formData, {
        onSuccess: () => {
          // Refetch user data after upload
          refetchProducts();
        },
      });
    }
  }

  return (
    <div className="flex flex-col w-[300px] min-h-[200px] border border-red-500 p-4 gap-2">
      <p>{product.name}</p>
      <img
        src={product.avatar}
        alt={`Image of ${product.name}`}
        className="w-full h-full mb-auto"
      />
      <div className="flex items-center justify-between mt-auto">
        <span>${product.price}</span>
        {storedUser?.role === "Admin" && (
          <div className="flex align-middle justify-between gap-4">
            <div className="bottom-[-50px] bg-white rounded-md border border-gray-800">
              <input
                id="imageInput"
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
              <label
                htmlFor="imageInput"
                className="flex items-center justify-center border border-solid border-black p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
              >
                {isUploading ? "..." : "Upload Photo"}{" "}
              </label>{" "}
            </div>
            <button>delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
