import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdsData from "../data/households.json";
import HouseholdInfo from "../components/household/HouseholdInfo";
import Members from "../components/household/Members";
import UsersData from "../data/users.json";
import SustainableGoal from "../components/household/SustainableGoal";
import Overlay from "../components/common/Overlay";

const Household = () => {
  const [household, setHousehold] = useState("");
  const householdsData = HouseholdsData;
  const users = UsersData;
  const [householdUsers, setHouseholdUsers] = useState([]);
  const [openOverlay, setOpenOverlay] = useState(false);
  // eslint-disable-next-line
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
            options={["About", "Logout"]}
            links={["/about", "/login"]}
            hideOverlay={() => setOpenOverlay(false)}
          />
        )}
        <div className="">
          <TopBar />
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
