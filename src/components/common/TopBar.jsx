import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { useLocation } from "react-router-dom";
import { IoWalletOutline, IoCheckboxOutline } from "react-icons/io5";
import { TbShoppingCart, TbUsers, TbUser } from "react-icons/tb";
import { MdCalendarToday } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { VscBell } from "react-icons/vsc";

const TopBar = () => {
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
      case "/tasks/:task":
        setTitle("TASK");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/tasks/new":
        setTitle("NEW TASK");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/tasks-manager":
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
        setShowBackButton(true);
        setIcon(null);
        break;
      case "/expenses/:expense":
        setTitle("EXPENSES");
        setShowBackButton(false);
        setIcon(<IoWalletOutline />);
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
  }, [location]);
  return (
    <div className="flex items-center gap-x-2 sticky w-screen py-5 px-5">
      {showBackButton && <BackButton />}
      {icon && <div>{icon}</div>}
      <h4 className="">{title}</h4>
    </div>
  );
};
export default TopBar;