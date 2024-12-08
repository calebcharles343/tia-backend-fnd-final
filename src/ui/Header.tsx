// import { authStore } from "../store/authStore";
import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { UserType } from "../interfaces";

import { useFetchImages } from "../hooks/images/useImages";
import { ChangeEvent, useState } from "react";
import { useUploadImage } from "../hooks/images/useMutateImage";
import { useDeleteImage } from "../hooks/images/useDeleteImage";

export default function Header() {
  // const { user } = authStore();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserType>(["user"]);
  const [errorFile, setErrorFile] = useState<string>();
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  const headers = {
    "x-user-id": "123",
    "Content-Type": "multipart/form-data", // required for image uploads
  };

  const {
    uploadImage,
    isUploading,
    isError: isUploadingErr,
    error: errorUploading,
  } = useUploadImage(headers);
  const { deleteImage, isDeleting } = useDeleteImage();

  const {
    images,
    isLoading,
    isError: isFetchingErr,
    error: errorFetching,
    refetch,
  } = useFetchImages(headers);

  // Delete images

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!validFileTypes.includes(file.type)) {
        setErrorFile("File must be in JPG, JPEG, or PNG format.");
        return;
      }

      setErrorFile("");

      const formData = new FormData();
      formData.append("image", file);

      uploadImage(formData, {
        onError: () => {
          setErrorFile("An error occurred while uploading the file.");
        },
      });
    }
  };

  // const { mutate: deleteImage, isLoading: deleting } = useDeleteImage();

  const handleDelete = (keyMain: string) => {
    deleteImage(keyMain, {
      onError: (error) => {
        setErrorFile(`An error occurred: ${error.message}`);
      },
    });
  };

  return (
    <header className="flex items-center justify-between col-start-2 col-end-3 c w-full h-full  bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4">
      <form>
        <div className="w-[55vw] flex items-center gap-2">
          <button>
            <HiSearch />
          </button>

          <input
            className="px-4 w-full h-8 mr-8 rounded-full focus:outline-none "
            type="text"
            placeholder="search"
          />
        </div>
      </form>

      <div className="min-w-48 flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={outline}
          alt="passport outline"
        />
        <span>{user?.name}</span>
      </div>
    </header>
  );
}
