import React, { useState } from "react";
import Image from "next/image";
import food from "../../../public/images/food.svg";
interface ImageUploaderProps {
  onChange: (imageUrl: string) => void;
}
const readImageFile = (file: File, callback: (imageUrl: string) => void) => {
  const reader = new FileReader();
  reader.onload = () => {
    const imageData = reader.result;
    if (imageData && typeof imageData === "string") {
      callback(imageData);
    }
  };
  reader.readAsDataURL(file);
};
const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      readImageFile(selectedFile, (imageData) => {
        setPreviewImage(imageData);
        onChange(imageData);
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full">
    <label htmlFor="image-upload" className="cursor-pointer">
      {previewImage ? (
        <div className="w-40 h-40 sm:w-18 sm:h-18 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-lg mb-2">
          <Image
            src={previewImage}
            alt="Preview"
            layout="responsive"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex w-40 h-40 sm:w-18 sm:h-18 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gray-200 rounded-lg mb-2 items-center justify-center">
          <Image src={food} alt="Placeholder" width={100} height={100} />
        </div>
      )}

      <input
        type="file"
        id="image-upload"
        className="hidden w-40 h-40 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-64 lg:h-64"
        accept="image/*"
        onChange={handleUpload}
      />
    </label>
  </div>
  );
};

export default ImageUploader;
