import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PiPlusThin } from "react-icons/pi";

const NewButton = ({ path }) => {
  return (
    <Link
      to={path}
      className="text-[4rem] p-3 bg-white rounded-full shadow-xl fixed bottom-[13%] right-5 z-[100]"
    >
      <PiPlusThin />
    </Link>
  );
};

NewButton.propTypes = {
  path: PropTypes.string,
};

export default NewButton;
