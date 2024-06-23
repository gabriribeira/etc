import React, { useState, useEffect } from "react";
import { useGetHouseholdQuery } from "../app/api";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import HouseholdInfo from "../components/household/HouseholdInfo";
import Members from "../components/household/Members";
import SustainableGoal from "../components/household/SustainableGoal";
import Overlay from "../components/common/Overlay";
import { useNavigationType, useLocation } from "react-router-dom";
import NotificationPopup from "../components/common/NotificationPopup";

const Household = () => {
  const location = useLocation();
  const [popup, setPopup] = useState({ message: "", isVisible: false });
  const { data: household, isLoading: isHouseholdLoading, error, refetch } = useGetHouseholdQuery();
  const [openOverlay, setOpenOverlay] = useState(false);
  const [openOverlayFromParent, setOpenOverlayFromParent] = useState(false);

  useEffect(() => {
    if (location.state && location.state.message) {
      setPopup({ message: location.state.message, isVisible: true });
    }
  }, [location.state]);

  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      refetch();
    }
  }, [navigationType, refetch]);

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
            hideOverlay={() => { setOpenOverlay(false); }}
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
          <NotificationPopup
            message={popup.message}
            isVisible={popup.isVisible}
            onClose={() => setPopup({ ...popup, isVisible: false })}
          />
          <BottomBar changeHousehold={true} openOverlayFromParent={openOverlayFromParent} />
        </div>
      </>
    )
  );
};

export default Household;
