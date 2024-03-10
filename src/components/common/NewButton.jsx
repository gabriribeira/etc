import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PiPlusThin } from "react-icons/pi";

const NewButton = ({ path }) => {
  return (
    <Link
      to={path}
      className="text-[2.5rem] p-5 bg-black90 bg-gradient-to-r from-black90 to-white/30 text-white rounded-full shadow-xl fixed bottom-[12%] right-5 z-[100]"
    >
      <PiPlusThin />
    </Link>
  );
};

NewButton.propTypes = {
  path: PropTypes.string,
};

export default NewButton;
