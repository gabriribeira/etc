import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { IoWalletOutline, IoWallet, IoList } from "react-icons/io5";
import { BiSolidShoppingBag, BiShoppingBag } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import ChangeHouseholdOverlay from "./ChangeHouseholdOverlay";
import { PiListBulletsBold } from "react-icons/pi";

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
      <footer className="z-[89]">
        <div className="h-[80px] z-[90]"></div>
        <div className="fixed bottom-0 pb-5 left-0 w-screen bg-white flex items-center justify-around text-black px-5 pt-1 h-[80px] text-3xl z-[90]">
          <Link
            to="/expenses"
            className={`flex flex-col items-center ${
              location.pathname === "/expenses" && "text-black"
            }`}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-9 h-9 flex items-center justify-center">
                {location.pathname.startsWith("/expenses") ? <IoWallet /> : <IoWalletOutline />}
              </div>
              <p className="text-[12px] absolute bottom-[-28px]">Expenses</p>
            </div>
          </Link>

          {changeHousehold ? (
            <button
              className={`flex flex-col items-center leading-5 ${
                location.pathname === `/household` &&
                "text-black"
              }`}
              onClick={() => setOverlay(true)}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-9 h-9 flex items-center justify-center">
                  {authHousehold && authHousehold.img ? (
                    <img
                      //eslint-disable-next-line
                      src={require(
                        `../../assets/data/households/${authHousehold.img}`
                      )}
                      alt="Menu Household"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <TbUsers />
                  )}
                </div>
                <p className="text-[12px] absolute bottom-[-28px]">Household</p>
              </div>
            </button>
          ) : (
            <Link
              to={`/household`}
              className={`flex flex-col items-center leading-5 ${
                location.pathname === `/household` &&
                "text-black"
              }`}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  {authHousehold ? (
                    <img
                      //eslint-disable-next-line
                      src={require(
                        `../../assets/data/households/${authHousehold.img}`
                      )}
                      alt="Menu Household"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <TbUsers />
                  )}
                </div>
                <p className="text-[12px] absolute bottom-[-28px]">Household</p>
              </div>
            </Link>
          )}
          <Link
            to="/lists"
            className={`flex flex-col items-center ${
              location.pathname === "/lists" && "text-black"
            }`}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-9 h-9 flex items-center justify-center">
                {location.pathname.startsWith("/lists") ? <PiListBulletsBold /> : <IoList />}
              </div>
              <p className="text-[12px] absolute bottom-[-28px]">Lists</p>
            </div>
          </Link>
          <Link
            to="/products"
            className={`flex flex-col items-center ${
              location.pathname === "/products" && "text-black"
            }`}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-9 h-9 flex items-center justify-center">
                {location.pathname.startsWith("/products") ? <BiSolidShoppingBag /> : <BiShoppingBag />}
              </div>
              <p className="text-[12px] absolute bottom-[-28px]">Products</p>
            </div>
          </Link>
        </div>
      </footer>
    </>
  );
};

BottomBar.propTypes = {
  changeHousehold: PropTypes.bool,
  openOverlayFromParent: PropTypes.bool,
};

export default BottomBar;
