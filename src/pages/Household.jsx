import React, { useState } from "react";
import { useGetHouseholdQuery } from "../app/api";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdInfo from "../components/household/HouseholdInfo";
import Members from "../components/household/Members";
import SustainableGoal from "../components/household/SustainableGoal";
import Overlay from "../components/common/Overlay";

const Household = () => {
  const { data: household, isLoading: isHouseholdLoading, error } = useGetHouseholdQuery();
  const [openOverlay, setOpenOverlay] = useState(false);
  const [openOverlayFromParent, setOpenOverlayFromParent] = useState(false);

  if (isHouseholdLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    household && (
      <>
        {openOverlay && (
          <Overlay
            label="SETTINGS"
            options={["About", "Logout"]}
            links={["/about", "/login"]}
            hideOverlay={() => {setOpenOverlay(false);}}
          />
        )}
        <div className="relative bg-white min-h-screen">
          <TopBar />
          <main className="pt-20">
            <div className="flex flex-col gap-y-6">
              <HouseholdInfo
                household={household.data}
                users={household.data.Users}
                openOverlayFromParent={() => setOpenOverlayFromParent(true)}
              />
              <SustainableGoal />
              <Members users={household.data.Users} household={household.data} />
            </div>
          </main>
          <BottomBar changeHousehold={true} openOverlayFromParent={openOverlayFromParent} />
        </div>
      </>
    )
  );
};

export default Household;
