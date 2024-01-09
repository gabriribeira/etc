import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { IoWalletOutline, IoCheckboxOutline } from "react-icons/io5";
import { TbShoppingCart, TbUsers, TbUser } from "react-icons/tb";
import { MdCalendarToday } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { VscBell } from "react-icons/vsc";

const TopBar = ({ text, description }) => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    switch (location.pathname) {
      case "/calendar":
        setTitle("CALENDAR");
        setShowBackButton(false);
        setIcon(<MdCalendarToday />);
        break;
      case "/event/:event/edit":
        setTitle("EDIT EVENT");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/event/new":
        setTitle("NEW EVENT");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/tasks":
        setTitle("TASKS");
        setShowBackButton(false);
        setIcon(<IoCheckboxOutline />);
        break;
      case "/tasks/new":
        setTitle("NEW TASK");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/task-manager":
        setTitle("MANAGE TASKS");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/households/new":
        setTitle("CREATE A HOUSEHOLD");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/expenses":
        setTitle("EXPENSES");
        setShowBackButton(false);
        setIcon(<IoWalletOutline />);
        break;
      case "/expenses/:expense":
        setTitle("EXPENSES");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/expenses/new":
        setTitle("NEW EXPENSE");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/household/:household":
        setTitle("HOUSEHOLD");
        setShowBackButton(false);
        setIcon(<TbUsers />);
        break;
      case "/users/:user":
        setTitle("PROFILE");
        setShowBackButton(false);
        setIcon(<TbUser />);
        break;
      case "/":
        setTitle("HOME");
        setShowBackButton(false);
        setIcon(<GoHome />);
        break;
      case "/join":
        setTitle("JOIN A HOUSEHOLD");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/lists":
        setTitle("SHOPPING LISTS");
        setShowBackButton(false);
        setIcon(<TbShoppingCart />);
        break;
      case "/lists/:list/item":
        setTitle("ITEM DETAILS");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/lists/new":
        setTitle("SHOPPING LIST");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/notifications":
        setTitle("NOTIFICATIONS");
        setShowBackButton(false);
        setIcon(<VscBell />);
        break;
      default:
        setTitle("");
        setShowBackButton(false);
        setIcon(null);
    }
    if (text) {
      console.log();
      setTitle(text.toUpperCase());
      setShowBackButton(true);
      setIcon(null);
    }
  }, [location.pathname, text]);
  return (
    <div className="flex flex-col sticky w-screen py-7 px-5">
      <div className="flex items-center gap-x-2">
        {showBackButton && <BackButton />}
        {icon && <div className="text-3xl">{icon}</div>}
        <h4 className="">{title}</h4>
      </div>
      {description && <p className="text-black60 text-base mt-2">{description}</p>}
    </div>
  );
};

TopBar.propTypes = {
  text: PropTypes.string,
  description: PropTypes.string,
};

export default TopBar;
