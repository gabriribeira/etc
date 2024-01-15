import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Widgets from "../components/homepage/Widgets";
import Activity from "../components/common/Activity";
import ActivityData from "../data/activity.json";
import NotificationsLink from "../components/homepage/NotificationsLink";

const Homepage = () => {
  const activityData = ActivityData;
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    if (activityData) {
      setActivity(
        activityData.filter((activity) => activity.household_id === 1)
      );
    }
  }, [activityData]);
  return (
    <div className="relative">
      <TopBar />
      <NotificationsLink />
      <div className="flex flex-col px-5">
        <Widgets />
        <div className="flex flex-col mt-6 gap-y-3">
          <h1 className="font-semibold text-lg">Activity</h1>
          {activity &&
            activity.map((activity, index) => (
              <Activity key={index} activity={activity} />
            ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default Homepage;
