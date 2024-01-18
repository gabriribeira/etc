import React, { useState, useEffect } from "react";
// import { RxPlus } from "react-icons/rx";
import TopBar from "../components/common/TopBar";

const AddMembers = () => {
  const [authUser, setAuthUser] = useState(null);
  // eslint-disable-next-line
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
  return (
    authUser &&
    authHousehold && (
      <div className="flex flex-col">
        <TopBar />
        <div className="flex flex-col w-full px-5">
          <div className="rounded-2xl flex items-center gap-x-3">
            <img
              //eslint-disable-next-line
              src={require(`../assets/data/households/${authHousehold.img}`)}
              alt="Authenticated User Profile Picture"
              className="w-[60px] h-[60px] rounded-full object-cover object-center left-0 top-0"
            />
            <h1 className="text-xl font-semibold text-black">
              {authHousehold.name}
            </h1>
          </div>
          <div className="rounded-2xl bg-black10 p-6 mt-6 flex justify-start">
            <div className="flex flex-col gap-y-3 items-center">
              <img
                //eslint-disable-next-line
                src={require(`../assets/data/users/${authUser.img}`)}
                alt="Authenticated User Profile Picture"
                className="w-[80px] h-[80px] rounded-full object-cover object-center left-0 top-0"
              />
              <h2 className="font-light text-base">{authUser.name}</h2>
            </div>
          </div>
          {/*
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="w-[35px] h-[35px] rounded-full relative flex justify-center items-center"
            >
              <img
                //eslint-disable-next-line
                src={require(`../assets/data/users/${authUser.img}`)}
                alt="Authenticated User Profile Picture"
                className="w-full h-full rounded-full absolute object-cover object-center left-0 top-0"
              />
            </button>
            <button
              type="button"
              className="w-[35px] h-[35px] rounded-full relative flex justify-center items-center text-xl bg-black10"
            >
              <RxPlus />
            </button>
          </div>
    */}
        </div>
      </div>
    )
  );
};

export default AddMembers;
