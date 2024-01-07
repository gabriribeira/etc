import React, { useState } from "react";
import { RxPlus } from "react-icons/rx";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <label
        htmlFor="file"
        className="w-[150px] h-[150px] m-auto bg-white shadow-2xl rounded-full text-5xl flex justify-center items-center cursor-pointer relative my-6 shrink-0"
      >
        {!image ? (
          <RxPlus />
        ) : (
          <img
            src={image}
            className="w-full h-full object-cover object-center absolute rounded-full top-0 left-0"
            alt="User Profile"
          />
        )}
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageChange(e)}
      />
    </>
  );
};
export default ImageUpload;
