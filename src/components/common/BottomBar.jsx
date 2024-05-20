import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { IoWalletOutline, IoWallet } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
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
      <footer className="z-[89]">
        <div className="h-[80px] z-[90]"></div>
        <div className="fixed bottom-0 left-0 w-screen bg-white flex items-start justify-around text-black px-5 pt-1 h-[80px] text-3xl z-[90]">
          <Link
            to="/expenses"
            className={`flex flex-col items-center leading-5 ${
              location.pathname === "/expenses" && "text-black"
            }`}
          >
            <div className="w-9 h-9 flex items-center justify-center">
              {location.pathname.startsWith("/expenses") ? <IoWallet /> : <IoWalletOutline />}
            </div>
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
              <div className="w-9 h-9 flex items-center justify-center">
                {authHousehold ? (
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
              <p className="text-[12px]">Household</p>
            </Link>
          )}
          <Link
            to="/lists"
            className={`flex flex-col items-center leading-5 ${
              location.pathname === "/lists" && "text-black"
            }`}
          >
            <div className="w-9 h-9 flex items-center justify-center">
              {location.pathname.startsWith("/lists") || location.pathname.startsWith("/image") ? <PiShoppingCartSimpleFill /> : <PiShoppingCartSimple />}
            </div>
            <p className="text-[12px]">Lists</p>
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
