import React from "react";
import PropTypes from "prop-types";
import { IoWalletOutline, IoCheckboxOutline } from "react-icons/io5";
import { TbShoppingCart, TbUsers } from "react-icons/tb";
import { GoHome } from "react-icons/go";

const WidgetIcon = ({ icon }) => {
  const getIcon = () => {
    switch (icon) {
      case "lists":
        return <TbShoppingCart />;
      case "tasks":
        return <IoCheckboxOutline />;
      case "goal":
        return <TbUsers />;
      case "expenses":
        return <IoWalletOutline />;
      default:
        return <GoHome />;
    }
  };
  return (
    <div className="flex items-center justify-center rounded-full p-3 bg-white/50 absolute top-2 right-2">
      <div className="text-white text-2xl">{getIcon()}</div>
    </div>
  );
};

WidgetIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default WidgetIcon;
