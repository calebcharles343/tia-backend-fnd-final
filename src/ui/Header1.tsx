import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";
import { ChangeEvent, useEffect, useState, useMemo, useCallback } from "react";
import { useUploadImage } from "../hooks/images/useMutateImage";
import { authStore } from "../store/authStore";
import { useUser } from "../features/authentication/useUser";
import { UserType } from "../interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import { useFetchImages } from "../hooks/images/useImages";

export default function Header() {
  const { useUser: storeUser, setUser } = authStore();
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const queryClient = useQueryClient();

  const storedUser = queryClient.getQueryData<UserType>(["user"]);

  const {
    user,
    isLoading: isGettingUser,
    refetch: refetchUser,
  } = useUser(storeUser?.id);

  const { updateUser, isUpdatingUser, isError, error } = useUpdateUser();

  const headers = useMemo(
    () => ({
      "x-user-id": `userAvatar-${storeUser?.id}`,
      "Content-Type": "multipart/form-data",
    }),
    [storeUser?.id]
  );

  const { uploadImage, isUploading } = useUploadImage(headers);
  const { images, refetchImages, isFetchingImages } = useFetchImages(headers);

  useEffect(() => {
    if (images?.data.urls)
      updateUser({
        userId: storeUser?.id,
        data: { avatar: images.data.urls[0].url },
      });
    console.log("❌");
  }, [images?.data.urls]);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        setErrorFile("File must be in JPG, JPEG, or PNG format.");
        return;
      }
      setErrorFile("");
      const formData = new FormData();
      formData.append("image", file); // Upload the image
      uploadImage(formData);
    }
  }

  return (
    <header className="flex items-center justify-between col-start-2 col-end-3 c w-full h-full bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4">
      {/* Hidden file input */}
      <input
        id="imageInput"
        type="file"
        className="hidden"
        onChange={handleUpload}
      />

      {/* Upload button */}
      <label
        htmlFor="imageInput"
        className="flex items-center justify-center border border-solid border-white p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
      >
        {isUploading ? "..." : "Upload"}
      </label>

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

      <div className="min-w-48 flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={storeUser?.avatar || outline}
          alt="passport outline"
        />
        <span>{storeUser?.name}</span>
      </div>
    </header>
  );
}
