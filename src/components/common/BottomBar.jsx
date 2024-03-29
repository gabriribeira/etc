import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { IoWalletOutline, IoWallet } from "react-icons/io5";
// import { IoCheckboxOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
// import { GoHome } from "react-icons/go";
import ChangeHouseholdOverlay from "./ChangeHouseholdOverlay";
import { PiShoppingCartSimple, PiShoppingCartSimpleFill } from "react-icons/pi";

const BottomBar = ({ changeHousehold, openOverlayFromParent }) => {
  const location = useLocation();
  const [authHousehold, setAuthHousehold] = useState(null);
  const [openOverlay, setOverlay] = useState(false);
  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };
    const storedHousehold = getCookieValue("household");
    if (storedHousehold) {
      setAuthHousehold(storedHousehold);
    }
  }, []);
  useEffect(() => {
    if (openOverlayFromParent) {
      setOverlay(true);
    }
  }, [openOverlayFromParent]);

  return (
    <>
      {openOverlay && (
        <ChangeHouseholdOverlay closeOverlay={() => setOverlay(false)} />
      )}
      <div className="h-[80px] z-[90]"></div>
      <div className="fixed bottom-0 left-0 w-screen bg-white flex items-start justify-around text-black px-5 pt-1 h-[80px] text-3xl z-[90]">
        <Link
          to="/expenses"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/expenses" && "text-black"
          }`}
        >
          {location.pathname === "/expenses" ? <IoWallet /> : <IoWalletOutline />}
          <p className="text-[12px]">Expenses</p>
        </Link>
        {changeHousehold ? (
          <button
            className={`flex flex-col items-center leading-5 ${
              location.pathname === `/households/${authHousehold?.id}` &&
              "text-black"
            }`}
            onClick={() => setOverlay(true)}
          >
            {authHousehold && authHousehold.img ? (
              <img
                //eslint-disable-next-line
                src={require(
                  `../../assets/data/households/${authHousehold.img}`
                )}
                alt="Household"
                className="w-[35px] h-[35px] rounded-full object-cover shrink-0"
              />
            ) : (
              <TbUsers />
            )}
            <p className="text-[12px]">Household</p>
          </button>
        ) : (
          <Link
            to={`/households/${authHousehold?.id}`}
            className={`flex flex-col items-center leading-5 ${
              location.pathname === `/households/${authHousehold?.id}` &&
              "text-black"
            }`}
          >
            {authHousehold ? (
              <img
                //eslint-disable-next-line
                src={require(
                  `../../assets/data/households/${authHousehold.img}`
                )}
                alt="Household"
                className="w-[30px] h-[30px] rounded-full object-cover shrink-0"
              />
            ) : (
              <TbUsers />
            )}
            <p className="text-[12px]">Household</p>
          </Link>
        )}
        <Link
          to="/lists"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/lists" && "text-black"
          }`}
        >
          {location.pathname === "/lists" ? <PiShoppingCartSimpleFill /> : <PiShoppingCartSimple />}
          <p className="text-[12px]">Lists</p>
        </Link>
        {/* <Link
          to="/"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/" && "text-blue"
          }`}
        >
          <GoHome />
          <p className="text-[12px]">Home</p>
        </Link> */}
        {/* <Link
          to="/tasks"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/tasks" && "text-blue"
          }`}
        >
          <IoCheckboxOutline />
          <p className="text-[12px]">Tasks</p>
        </Link> */}
      </div>
    </>
  );
};

BottomBar.propTypes = {
  changeHousehold: PropTypes.bool,
  openOverlayFromParent: PropTypes.bool,
};

export default BottomBar;
