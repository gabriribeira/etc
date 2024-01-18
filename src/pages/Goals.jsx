import React, {useState} from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import GoalsData from "../data/goals.json";
import Button from "../components/common/Button";

const Goals = () => {
  const goalsData = GoalsData;
  //eslint-disable-next-line
  const [tags, setTags] = useState(null);
  //eslint-disable-next-line
  const [goal, setGoal] = useState(null);
  return (
    <div>
      <TopBar />
      <div className="px-5 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-lg font-semibold text-black">
            Select Household Sustainable Tags
          </h2>
          <p className="text-base text-black50 font-medium">
            Select some tags that you want to define your household in terms of
            sustainable practices.
          </p>
        </div>
        <div className="flex flex-wrap w-full gap-3">
          {goalsData &&
            goalsData.map((goal, index) => (
              <button
                key={index}
                className="rounded-2xl border-2 border-green text-green text-base py-1 px-2"
              >
                {goal.title}
              </button>
            ))}
        </div>
        <div className="w-full flex flex-col items-end gap-y-3">
          <Button label="Next" action={() => {}} />
          <a href="/" className="text-base text-blue font-medium">
            do this later
          </a>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};
export default Goals;
