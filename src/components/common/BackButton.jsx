import React from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="text-3xl">
      <SlArrowLeft />
    </button>
  );
};

export default BackButton;
