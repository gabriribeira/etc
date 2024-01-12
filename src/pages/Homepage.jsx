import React from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Widges from '../components/common/Widgets';
import Activity from "../components/common/Activity";

const Homepage = () => {
  return (
    <div>
      <TopBar />
      <Widges/>
      <Activity/>
      <BottomBar />
    </div>
  );
};

export default Homepage;