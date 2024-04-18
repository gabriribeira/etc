import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BsPlusCircleFill } from "react-icons/bs";

const NewButton = ({ path, aria }) => {
  return (
    <Link
      to={path}
      className="text-3xl text-black90"
      aria-label={aria}
    >
      <BsPlusCircleFill />
    </Link>
  );
};

NewButton.propTypes = {
  path: PropTypes.string,
  aria: PropTypes.string,
};

export default NewButton;
