import React from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Widgets from "../components/homepage/Widgets";
import Activity from "../components/common/Activity";

const Homepage = () => {
  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5">
        <Widgets />
        <Activity />
      </div>
      <BottomBar />
    </div>
  );
};

export default Homepage;
