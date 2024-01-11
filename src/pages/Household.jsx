import React from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";

const Household = () => {
    return (
      <div>
        <TopBar />
        <div className="flex flex-col bg-black10 text-center">
          <button className="text-right mr-2 text-blue font-semibold text-sm">edit</button>
            <div className="py-8">
              <img className="rounded" src="" alt="Household profile picture" />
              <h1 className="font-semibold text-lg">Variável Nome Household</h1>
              <p className="font-light text-sm">x Members</p>
            </div>
          </div>

        <div className="flex flex-col px-5 gap-y-5">
          <div className="flex flex-col mt-5">
            <h1 className="font-semibold text-lg">Description</h1>
            <p className="text-black50">
              variável jason
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