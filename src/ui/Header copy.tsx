import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";
import { ChangeEvent, useEffect, useState } from "react";
import { useUploadImage } from "../hooks/images/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import SpinnerMini from "./SpinnerMini";
import Cookies from "js-cookie";

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

  const { uploadImage, isUploading } = useUploadImage({
    "x-user-id": `userAvatar-${userNew?.data?.id}`,
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${authToken}`,
  });
  console.log(userNew, isLoadingUser, isUploading);

  useEffect(() => {
    refetchUser();
  }, []);

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
          queryClient.invalidateQueries(["user"] as any);
          refetchUser();
        },
      });
    }

    setIsupdateBox(false);
  }

  return (
    <header className="flex items-center justify-between col-start-2 col-end-3 c w-full h-full bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-8">
      <form>
        <div className="w-[55vw] flex items-center gap-2">
          <button>
            <HiSearch />
          </button>

          <input
            className="px-4 w-full h-8 mr-8 rounded-full focus:outline-none"
            type="text"
            placeholder="search"
          />
        </div>
      </form>

      {isUploading ? (
        <SpinnerMini />
      ) : (
        <div className="relative min-w-48 flex-col items-center gap-4">
          <div className="flex items-center gap-4 ">
            <img
              onClick={() => setIsupdateBox(!isupdateBox)}
              className="w-12 h-12 rounded-full"
              src={userNew?.data?.avatar || outline}
              alt="passport outline"
            />
            <span>{userNew?.data?.name}</span>
          </div>

          {isupdateBox ? (
            <div className="absolute bottom-[-50px] bg-white rounded-md border border-gray-800">
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
          ) : null}
        </div>
      )}
    </header>
  );
}
