import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";
import { ChangeEvent, useEffect, useState } from "react";
import { useUploadImage } from "../hooks/images/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import SpinnerMini from "./SpinnerMini";
import Cookies from "js-cookie";
import imageHeader from "../utils/imageApiHeader";

export default function Header() {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const [isupdateBox, setIsupdateBox] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const authToken = Cookies.get("jwt");

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

  const {
    isLoading: isLoadingUser,
    user: userNew,
    refetch: refetchUser,
  } = useUser(storedUser?.id);

  useEffect(() => {
    refetchUser();
  }, []);

  const { uploadImage, isUploading } = useUploadImage(
    imageHeader(`userAvatar-${storedUser?.id}`)
  );

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
      console.log("FormData:", formData);
      uploadImage(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"] as any);
          refetchUser();
        },
      });
    }
  }

  return (
    <header className="flex items-center justify-between col-start-2 col-end-3 w-full h-full bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4 md:p-8">
      <form className="flex-grow">
        <div className="flex items-center gap-2">
          <button>
            <HiSearch />
          </button>
          <input
            className="px-4 w-[60%] h-8 rounded-full focus:outline-none"
            type="text"
            placeholder="search"
          />
        </div>
      </form>

      {isUploading || isLoadingUser ? (
        <SpinnerMini />
      ) : (
        <div className="relative flex items-center gap-4">
          <img
            onClick={() => setIsupdateBox(!isupdateBox)}
            className="w-12 h-12 rounded-full cursor-pointer"
            src={userNew?.data?.avatar || outline}
            alt="passport outline"
          />
          <span className="hidden sm:block">{userNew?.data?.name}</span>

          {isupdateBox && (
            <div className="absolute bottom-[-50px] bg-white rounded-md border border-gray-800 p-2">
              <input
                id="imageInput"
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
              <label
                htmlFor="imageInput"
                className="flex items-center justify-center border border-solid border-white p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
              >
                {isUploading ? "..." : "Upload Photo"}
              </label>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
