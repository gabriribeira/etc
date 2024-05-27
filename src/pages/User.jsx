import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { Link } from "react-router-dom";
import { RxDotsVertical } from "react-icons/rx";
import HouseholdData from "../data/households.json";
import CategoriesData from "../data/categories.json"; // Import the categories data
import { useLocation } from "react-router-dom";
import UsersData from "../data/users.json";

const User = () => {
  const householdData = HouseholdData;
  const categoriesData = CategoriesData; // Categories data
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

  const getCategoryTitle = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.title : "Unknown";
  };

  return (
    user && (
      <div>
        <TopBar />
        <main className="mt-32">
          <div className="flex flex-col">
            <div className="flex flex-col bg-black20 text-center relative">
              {visitorIsAuthUser && (
                <Link
                  to={`/users/${user.id}/edit`}
                  className="font-medium text-sm absolute top-3 right-3"
                >
                  edit
                </Link>
              )}
              <div className="py-16 flex flex-col items-center justify-center">
                <img
                  // eslint-disable-next-line
                  src={require(`../assets/data/users/${user.img}`)}
                  alt="User Profile Picture"
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                />
                <h1 className="font-medium text-xl mt-2">{user.name}</h1>
                <p className="font-normal text-sm">@{user.username}</p>
              </div>
            </div>
            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Description</h1>
              <p className="text-black text-base">{user.description}</p>
            </div>

            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-4">Food Restrictions</h1>
              <p className="text-base">
                {user.food_restriction.map((categoryId, index) => (
                  <span key={index} className="bg-black text-white p-3 rounded-xl mr-2">
                    {getCategoryTitle(categoryId)}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Households</h1>
              <div className="flex flex-col gap-y-3">
                {households.map((household, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-black20 rounded-2xl p-3 shadow-lg"
                  >
                    <div className="flex items-center gap-x-3">
                      <img
                        // eslint-disable-next-line
                        src={require(`../assets/data/households/${household.img}`)}
                        alt="Household Profile Picture"
                        className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
                      />
                      <p className="font-medium text-lg font-base">
                        {household.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <button
                        type="button"
                        className="text-white text-2xl"
                        aria-label="Household settings"
                      >
                        <RxDotsVertical />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <BottomBar />
      </div>
    )
  );
};

export default User;
