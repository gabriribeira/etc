import React from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="text-2xl pr-2 flex flex-shrink-0">
      <SlArrowLeft />
    </button>
  );
};

export default BackButton;
