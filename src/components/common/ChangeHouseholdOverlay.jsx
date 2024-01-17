import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import HouseholdsData from "../../data/households.json";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ChangeHouseholdOverlay = ({ closeOverlay }) => {
  const householdsData = HouseholdsData;
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [authHousehold, setAuthHousehold] = useState(null);
  const [households, setHouseholds] = useState(null);
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

    const storedUser = getCookieValue("user");
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);
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
    if (authUser && authHousehold && householdsData) {
      const households = householdsData.filter((household) =>
        authUser.households.includes(household.id)
      );
      setHouseholds(households);
    }
  }, [authUser, authHousehold, householdsData]);
  const changeHousehold = (household) => {
    Cookies.set("household", JSON.stringify(household), { path: "/" });
    setTimeout(() => {
      navigate(`/households/${household.id}`);
    }, 1000);
  };
  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-[110]">
      <div
        onClick={closeOverlay}
        className="fixed h-screen w-screen bg-black/20 top-0 left-0"
      ></div>
      <div className="absolute bg-white bottom-0 z-[111] left-0 w-screen rounded-t-[2rem] px-5 py-10">
        <div className="absolute top-[10px] left-0 w-screen flex justify-center">
          <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-y-3 mb-6">
          <h1 className="font-semibold text-xl text-black">Households</h1>
        </div>
        <div className="mb-6 flex flex-col gap-y-3">
          {households &&
            authHousehold &&
            households.map((household, index) => (
              <button
                key={index}
                className={`flex items-center justify-between rounded-2xl p-3 ${
                  authHousehold.id === household.id
                    ? "bg-blue/60 text-white"
                    : "border-2 border-blue text-black"
                }`}
                onClick={() => {
                  authHousehold.id !== household.id &&
                    changeHousehold(household);
                }}
              >
                <div className="flex items-center gap-x-3 w-full">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
                    <img
                      //eslint-disable-next-line
                      src={require(
                        `../../assets/data/households/${household.img}`
                      )}
                      alt="User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-lg font-normal">{household.name}</h2>
                </div>
              </button>
            ))}
        </div>
        <Button label={"Add New"} action={closeOverlay} stroke={true} />
      </div>
    </div>
  );
};

ChangeHouseholdOverlay.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};

export default ChangeHouseholdOverlay;
