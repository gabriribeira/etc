import React from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";

const Household = () => {
    return (
      <div className="relative">
        <TopBar />
        <div className="flex flex-col gap-y-3 bg-black10">
          <div className="content-center">
            <img className="rounded" src="" alt="Household profile picture"></img>
            <h1 className="font-semibold text-lg">Variável Nome Household</h1>
            <p className="font-light text-sm">x Members</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
            <h1 className="font-semibold text-lg">Description</h1>
            variável jason
        </div>
        <div className="flex flex-col gap-y-3">
            <h1 className="font-semibold text-lg">Tags</h1>
            Tag component
        </div>
        <div className="flex flex-col gap-y-3">
            <h1 className="font-semibold text-lg">Sustainable Goal</h1>
            Goal component
        </div>
        <div className="flex flex-col gap-y-3">
            <h1 className="font-semibold text-lg">Members</h1>
            Members component
        </div>
        <BottomBar />
      </div>
    );
  };
  export default Household;