import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoCameraOutline } from 'react-icons/io5';

const PhotoInput = ({ onChange, value, label }) => {
  const [photo, setPhoto] = useState(value);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setPhoto(fileURL);
    onChange(file);
  };

  return (
    <div>
      <p className="font-medium">{label}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
        id="photo-input"
      />
      <label htmlFor="photo-input" className="cursor-pointer">
        <div className="flex items-center justify-center bg-black20 h-20 w-20 rounded-[20px]">
          {photo ? (
            <img src={photo} alt="Selected" className=" object-cover h-full w-full rounded-[20px]" />
          ) : (
            <span className="flex items-center justify-start h-full">
                <span className=''><IoCameraOutline size={30} /></span></span>
          )}
        </div>
      </label>
    </div>
  );
};

PhotoInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
  };
  
  export default PhotoInput;
