import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { Link } from "react-router-dom";
import { RxDotsVertical } from "react-icons/rx";
import HouseholdData from "../data/households.json";
import { useLocation } from "react-router-dom";
import UsersData from "../data/users.json";

const User = () => {
  const householdData = HouseholdData;
  const usersData = UsersData;
  const location = useLocation();
  const [authUser, setAuthUser] = useState(null);
  const [households, setHouseholds] = useState([]);
  const [visitorIsAuthUser, setVisitorIsAuthUser] = useState(false);
  const [paramUser, setParamUser] = useState(null);
  const [user, setUser] = useState(null);
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
    if (householdData && user) {
      authUser.households.forEach((householdId) => {
        const household = householdData.find(
          (household) => household.id === householdId
        );
        setHouseholds((households) => [...households, household]);
      });
    }
  }, [householdData, user]);
  useEffect(() => {
    if (location) {
      const userAux = usersData.find(
        (user) => user.id == location.pathname.split("/")[2]
      );
      if (userAux) {
        setParamUser(userAux);
      }
    }
  }, [location]);
  useEffect(() => {
    if (authUser && paramUser) {
      if (authUser.id && location.pathname.split("/")[2] == authUser.id) {
        setVisitorIsAuthUser(true);
        setUser(authUser);
      } else {
        setVisitorIsAuthUser(false);
        setUser(paramUser);
      }
    }
  }, [authUser, location, paramUser]);
  return (
    user && (
      <div>
        <TopBar />
        <div className="flex flex-col">
          <div className="flex flex-col bg-black bg-gradient-to-br from-black to-white/20 text-center relative">
            {visitorIsAuthUser && (
              <Link
                to={"/households/household/edit"}
                className="text-white font-light text-sm absolute top-3 right-3"
              >
                edit
              </Link>
            )}
            <div className="py-16 flex flex-col items-center justify-center">
              <img
                //eslint-disable-next-line
                src={require(`../assets/data/users/${user.img}`)}
                alt="Household Profile Picture"
                className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
              />
              <h1 className="font-normal text-xl text-white mt-2">{user.name}</h1>
              <p className="font-light text-sm text-white">@{user.username}</p>
            </div>
          </div>
          <div className="flex flex-col px-5 mt-6">
            <h1 className="font-semibold text-lg mb-2">Description</h1>
            <p className="text-black text-base">{user.description}</p>
          </div>
          <div className="flex flex-col px-5 mt-6">
            <h1 className="font-semibold text-lg mb-2">Households</h1>
            <div className="flex flex-col gap-y-3">
              {households.map((household, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-black10 rounded-2xl p-3"
                >
                  <div className="flex items-center gap-x-3">
                    <img
                      //eslint-disable-next-line
                      src={require(
                        `../assets/data/households/${household.img}`
                      )}
                      alt="Household Profile Picture"
                      className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
                    />
                    <p className="text-black text-lg font-semibold">
                      {household.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <button type="button" className="text-black text-2xl">
                      <RxDotsVertical />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomBar />
      </div>
    )
  );
};
export default User;
