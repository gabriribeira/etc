import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoWalletOutline, IoCheckboxOutline } from "react-icons/io5";
import { TbShoppingCart, TbUsers } from "react-icons/tb";
import { GoHome } from "react-icons/go";

const BottomBar = () => {
  const location = useLocation();
  const [authHousehold, setAuthHousehold] = useState(null);
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
  return (
    <>
      <div className="h-[80px]"></div>
      <div className="fixed bottom-0 w-screen bg-white flex items-center justify-between text-black px-5 h-[80px] text-4xl z-[90]">
        <Link
          to="/expenses"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/expenses" && "text-blue"
          }`}
        >
          <IoWalletOutline />
          <p className="text-[12px]">Expenses</p>
        </Link>
        <Link
          to="/lists"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/lists" && "text-blue"
          }`}
        >
          <TbShoppingCart />
          <p className="text-[12px]">Lists</p>
        </Link>
        <Link
          to="/"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/" && "text-blue"
          }`}
        >
          <GoHome />
          <p className="text-[12px]">Home</p>
        </Link>
        <Link
          to="/tasks"
          className={`flex flex-col items-center leading-5 ${
            location.pathname === "/tasks" && "text-blue"
          }`}
        >
          <IoCheckboxOutline />
          <p className="text-[12px]">Tasks</p>
        </Link>
        <Link
          to={`/households/${authHousehold?.id}`}
          className={`flex flex-col items-center leading-5 ${
            location.pathname === `/households/${authHousehold?.id}` && "text-blue"
          }`}
        >
          {authHousehold ? (
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
        </Link>
      </div>
    </>
  );
};

export default BottomBar;
