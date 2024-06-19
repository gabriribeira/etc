import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { IoWalletOutline, IoWallet } from "react-icons/io5";
import ChangeHouseholdOverlay from "./ChangeHouseholdOverlay";
import { PiShoppingCartSimple, PiShoppingCartSimpleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useGetHouseholdQuery } from "../../app/api";
import Image from "../../assets/imgs/etc/logo_dots.png";

const BottomBar = ({ changeHousehold, openOverlayFromParent }) => {
  const location = useLocation();
  const householdId = useSelector((state) => state.auth.currentHousehold);
  const [authHousehold, setAuthHousehold] = useState(null);
  const [openOverlay, setOverlay] = useState(false);

  const { data: household } = useGetHouseholdQuery(householdId);

  useEffect(() => {
    if (openOverlayFromParent) {
      setOverlay(true);
    }
  }, [openOverlayFromParent]);

  useEffect(() => {
    if (household) {
      setAuthHousehold(household.data);
    }
  }
    , [household]);

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
            className={`flex flex-col items-center ${location.pathname === "/expenses" && "text-black"
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
              className={`flex flex-col items-center leading-5 ${location.pathname === `/household` &&
                "text-black"
                }`}
              onClick={() => setOverlay(true)}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-9 h-9 flex items-center justify-center">
                  <img
                    //eslint-disable-next-line
                    src={authHousehold?.img_url ? authHousehold?.img_url : Image}
                    alt="Menu Household"
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[12px] absolute bottom-[-28px]">Household</p>
              </div>
            </button>
          ) : (
            <Link
              to={`/household`}
              className={`flex flex-col items-center leading-5 ${location.pathname === `/household` &&
                "text-black"
                }`}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-9 h-9 flex items-center justify-center">
                  <img
                    //eslint-disable-next-line
                    src={authHousehold?.img_url ? authHousehold?.img_url : Image}
                    alt="Menu Household"
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[12px] absolute bottom-[-28px]">Household</p>
              </div>
            </Link>
          )}
          <Link
            to="/lists"
            className={`flex flex-col items-center ${location.pathname === "/lists" && "text-black"
              }`}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-9 h-9 flex items-center justify-center">
                {location.pathname.startsWith("/lists") ? <PiShoppingCartSimpleFill /> : <PiShoppingCartSimple />}
              </div>
              <p className="text-[12px] absolute bottom-[-28px]">Lists</p>
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
