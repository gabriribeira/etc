import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdsData from "../data/households.json";
import HouseholdInfo from "../components/household/HouseholdInfo";
import Members from "../components/household/Members";
import UsersData from "../data/users.json";
import { IoSettingsOutline } from "react-icons/io5";
import SustainableGoal from "../components/household/SustainableGoal";
import Overlay from "../components/common/Overlay";

const Household = () => {
  const [household, setHousehold] = useState("");
  const householdsData = HouseholdsData;
  const users = UsersData;
  const [householdUsers, setHouseholdUsers] = useState([]);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [authHousehold, setAuthHousehold] = useState(null);
  const [openOverlayFromParent, setOpenOverlayFromParent] = useState(false);
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
    if (householdsData && authHousehold) {
      const households = householdsData.find((household) => household.id === authHousehold.id);
      setHousehold(households);
    }
  }, [householdsData, authHousehold]);
  useEffect(() => {
    if (users && authHousehold) {
      const householdUsers = users.filter((user) =>
        user.households.includes(authHousehold.id)
      ); //alterar para o household correto
      setHouseholdUsers(householdUsers);
    }
  }, [users, authHousehold]);
  return (
    household &&
    householdUsers && (
      <>
        {openOverlay && (
          <Overlay
            label="SETTINGS"
            options={["Profile", "About", "Logout"]}
            links={[`/users/${authUser.id}`, "/about", "/login"]}
            hideOverlay={() => setOpenOverlay(false)}
          />
        )}
        <div>
          <TopBar />
          <button
            onClick={() => setOpenOverlay(true)}
            className="fixed top-6 right-4 text-4xl text-black z-[101]"
          >
            <IoSettingsOutline />
          </button>
          <div className="flex flex-col gap-y-6">
            <HouseholdInfo household={household} users={householdUsers} openOverlayFromParent={() => setOpenOverlayFromParent(true)} />
            <SustainableGoal />
            <Members users={householdUsers} admins={household.admins} />
          </div>
          <BottomBar changeHousehold={true} openOverlayFromParent={openOverlayFromParent} />
        </div>
      </>
    )
  );
};
export default Household;
