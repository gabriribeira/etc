import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdsData from "../data/households.json";
import HouseholdInfo from "../components/household/HouseholdInfo";
import Members from "../components/household/Members";
import UsersData from "../data/users.json";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const Household = () => {
  const [household, setHousehold] = useState("");
  const householdsData = HouseholdsData;
  const users = UsersData;
  const [householdUsers, setHouseholdUsers] = useState([]);
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
      <div>
        <TopBar />
        <Link to={"/households/1/settings"} className="fixed top-6 right-4 text-4xl text-black z-[101]"> {/* TODO: Não Esquecer Mudar para o id do household correto */}
          <IoSettingsOutline />
        </Link>
        <HouseholdInfo household={household} users={householdUsers} />
        <Members users={householdUsers} admins={household.admins} />
        <BottomBar />
      </div>
    )
  );
};
export default Household;
