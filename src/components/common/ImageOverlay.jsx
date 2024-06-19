import React from "react";
import PropTypes from "prop-types";

function ImageOverlay({ img_url, name, onClose }) {
  const handleClickOutside = (event) => {
    if (event.target.className.includes("overlay-background")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 overlay-background"
      onClick={handleClickOutside}
    >
      <div className="relative">
        <button
          className="absolute top-0 right-0 m-4 text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center bg-white">
          <p className="text-black font-semibold py-3">{name}</p>
          <img src={require(`../../assets/imgs/products/${img_url}`)} alt="Product" className="max-w-full max-h-full mb-4" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
}

ImageOverlay.propTypes = {
  img_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageOverlay;
