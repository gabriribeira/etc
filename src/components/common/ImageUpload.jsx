import React, { useState } from "react";
import { RxPlus } from "react-icons/rx";
import PropTypes from "prop-types";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onImageUpload(file);
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
            referrerPolicy="no-referrer"
          />
        )}
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );
};

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;