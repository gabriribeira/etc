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
  useEffect(() => {
    if (householdsData) {
      const households = householdsData.find((household) => household.id === 1); //Não esquecer de mudar o household_id para o id da casa do user
      setHousehold(households);
    }
  }, [householdsData]);
  useEffect(() => {
    if (users) {
      const householdUsers = users.filter((user) =>
        user.households.includes(1)
      ); //alterar para o household correto
      setHouseholdUsers(householdUsers);
    }
  }, [users]);
  return (
    household &&
    householdUsers && (
      <>
        {openOverlay && (
          <Overlay
            label="SETTINGS"
            options={["Profile", "About"]}
            links={["/user", "/about"]}
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
            <HouseholdInfo household={household} users={householdUsers} />
            <SustainableGoal />
            <Members users={householdUsers} admins={household.admins} />
          </div>
          <BottomBar />
        </div>
      </>
    )
  );
};
export default Household;
