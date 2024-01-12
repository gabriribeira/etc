
import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdsData from "../data/households.json";
import HouseholdBanner from "../components/household/HouseholdBanner";

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
            <HouseholdBanner household={household} key={index} />
          ))
        }        

        <div className="flex flex-col px-5 gap-y-5">
          <div className="flex flex-col mt-5">
            <h1 className="font-semibold text-lg">Description</h1>
            <p className="text-black50">
              {households.description}
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">Tags</h1>
            <p className="text-black50">
              Tag component
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">Sustainable Goal</h1>
            <p className="text-black50">
              Goal component
            </p>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">Members</h1>
            <p className="text-black50">
              Members component
            </p>
          </div>
        </div>
        <BottomBar />
      </div>
    );
  };
  export default Household;