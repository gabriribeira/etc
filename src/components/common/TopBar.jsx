import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  IoWalletOutline,
  IoCheckboxOutline,
  //eslint-disable-next-line
  IoPeopleOutline,
} from "react-icons/io5";
import { TbUsers, TbUser } from "react-icons/tb";
import { MdCalendarToday } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { VscBell } from "react-icons/vsc";
import { PiShoppingCartSimple } from "react-icons/pi";

const TopBar = ({ text, description }) => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    const primaryPath = pathSegments[0];

    switch (primaryPath) {
      case "about":
        setTitle("ABOUT");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "calendar":
        setTitle("CALENDAR");
        setShowBackButton(false);
        setIcon(<MdCalendarToday />);
        break;
      case "event":
        //eslint-disable-next-line
        const eventIndex = pathSegments.indexOf("event");
        if (eventIndex !== -1 && eventIndex + 2 < pathSegments.length) {
          const eventId = pathSegments[eventIndex + 2];
          setTitle(`EDIT EVENT (${eventId})`);
        } else if (pathSegments.includes("new")) {
          setTitle("NEW EVENT");
        } else {
          setTitle("EVENT");
        }
        setShowBackButton(true);
        setIcon(null);
        break;
      case "tasks":
        setTitle("TASKS");
        setShowBackButton(false);
        setIcon(<IoCheckboxOutline />);
        break;
      case "tasks/new":
        setTitle("NEW TASK");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "task-manager":
        setTitle("MANAGE TASKS");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "households":
        //eslint-disable-next-line
        const householdIndex = pathSegments.indexOf("households");
        if (householdIndex !== -1 && householdIndex + 1 < pathSegments.length) {
          setTitle(`HOUSEHOLD`);
          setShowBackButton(false);
          setIcon(<TbUsers />);
        } else if (pathSegments.includes("new")) {
          setTitle("CREATE A HOUSEHOLD");
          setShowBackButton(true);
          setIcon(null);
        }
        break;
      case "expenses":
        //eslint-disable-next-line
        const expenseIndex = pathSegments.indexOf("expenses");
        if (expenseIndex !== -1) {
          const expenseId = pathSegments[expenseIndex + 1];
          if (expenseId) {
            setTitle("BALANCE DETAILS");
            setShowBackButton(true);
            setIcon(null);
          } else if (pathSegments.includes("balance")) {
            setTitle("NEW EXPENSE");
            setShowBackButton(true);
            setIcon(null);
          } else if (pathSegments.includes("new")) {
            setTitle("NEW EXPENSE");
            setShowBackButton(true);
            setIcon(null);
          } else {
            setTitle("EXPENSES");
            setShowBackButton(false);
            setIcon(<IoWalletOutline />);
          }
        }
        break;
      case "users":
        //eslint-disable-next-line
        const userIndex = pathSegments.indexOf("users");
        if (userIndex !== -1 && userIndex + 1 < pathSegments.length) {
          setTitle(`USER PROFILE`);
          setShowBackButton(false);
          setIcon(<TbUser />);
        } else {
          setTitle("USERS");
          setShowBackButton(false);
          setIcon(<TbUsers />);
        }
        break;
      case "":
        setTitle("HOME");
        setShowBackButton(false);
        setIcon(<GoHome />);
        break;
      case "join":
        setTitle("JOIN A HOUSEHOLD");
        setShowBackButton(true);
        setIcon(null);
        break;
      case "lists":
        //eslint-disable-next-line
        const listIndex = pathSegments.indexOf("lists");
        if (listIndex !== -1) {
          const listId = pathSegments[listIndex + 1];
          const itemIndex = pathSegments.indexOf("item");
          if (itemIndex !== -1 && itemIndex + 1 < pathSegments.length) {
            setTitle(`ITEM DETAILS`);
            setShowBackButton(true);
          } else if (listId) {
            setTitle(`SHOPPING LIST`);
            setShowBackButton(true);
          } else {
            setTitle(`SHOPPING LISTS`);
            setShowBackButton(false);
            setIcon(<PiShoppingCartSimple />);
          }
        } else {
          setTitle("SHOPPING LISTS");
          setShowBackButton(false);
          setIcon(<PiShoppingCartSimple />);
        }
        break;
      case "notifications":
        setTitle("NOTIFICATIONS");
        setShowBackButton(false);
        setIcon(<VscBell />);
        break;
      default:
        setTitle("HOMEPAGE");
        setShowBackButton(false);
        setIcon(<GoHome />);
    }

    if (text) {
      setTitle(text.toUpperCase());
      setShowBackButton(true);
      setIcon(null);
    }
  }, [location.pathname, text]);

  return (
    <div className="flex flex-col sticky top-0 w-screen py-7 px-5 z-[100] bg-white">
      <div className="flex items-center gap-x-2">
        {showBackButton && <BackButton />}
        {icon && <div className="text-3xl">{icon}</div>}
        <h4 className="">{title}</h4>
      </div>
      {description && (
        <p className="text-black60 text-base mt-2">{description}</p>
      )}
    </div>
  );
};

TopBar.propTypes = {
  text: PropTypes.string,
  description: PropTypes.string,
};

export default TopBar;
