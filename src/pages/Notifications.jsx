import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import SearchInput from "../components/common/SearchInput";
import Activity from "../components/common/Activity";
import ActivityData from "../data/activity.json";

const Notifications = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value) => {
    setSearch(value);
  };

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
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-3">
        <SearchInput
          label="Search"
          value={search}
          onChange={handleSearchChange}
          isNotificationSearch={true}
        />
        {activity &&
          activity.map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
      </div>
      <BottomBar />
    </div>
  );
};

export default Notifications;
