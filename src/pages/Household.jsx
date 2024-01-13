
import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdsData from "../data/households.json";
import HouseholdInfo from "../components/household/HouseholdInfo";

const Household = () => {
  const [households, setHouseholds] = useState('');
  const householdsData = HouseholdsData;
  
  useEffect(() => {
    if (householdsData) {
      const households = householdsData.filter((household) => household.id === 1); //Não esquecer de mudar o household_id para o id da casa do user
      setHouseholds(households);
    }
  }, [householdsData]);

    return (
      <div>
        <TopBar />
        {households &&
          households.map((household, index) => (
            <HouseholdInfo household={household} key={index} />
          ))
        }        
        <BottomBar />
      </div>
    );
  };
  export default Household;