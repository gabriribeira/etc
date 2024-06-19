import React, { useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import GoalsData from "../data/goals.json";
import Button from "../components/common/Button";
import ProgressBar from "../components/common/ProgressBar";
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  const goalsData = GoalsData;
  const totalTags = goalsData.length;
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const toggleGoal = (goal) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedTags.length > 0) {
      setStep(2);
    }
  };

  const handleSelectGoal = () => {
    if (step === 2 && selectedGoals.length > 0) {
      navigate('/onboarding');
    }
  };

  
  const progress = (selectedTags.length / totalTags) * 100;

  return (
    <div className="relative bg-white min-h-screen flex flex-col">
      <TopBar />
      
      <main className="pt-28 flex-grow">
        {step === 1 && (
          <div className="px-5 flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-lg font-semibold text-black">
                Sustainable Tags
              </h2>
              <p className="text-base text-black50 font-medium">
                Select some tags that you want to define your household in terms of sustainable practices.
              </p>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex flex-wrap w-full gap-3">
              {goalsData &&
                goalsData.map((goal, index) => (
                  <button
                    key={index}
                    className={`rounded-2xl border-2 border-green text-base py-1 px-2 ${
                      selectedTags.includes(goal.title)
                        ? "bg-green text-white"
                        : "text-green"
                    }`}
                    onClick={() => toggleTag(goal.title)}
                  >
                    {goal.title}
                  </button>
                ))}
            </div>
            <div className="w-full flex flex-col items-end gap-y-3">
              <Button label="Next" action={handleNext} disabled={selectedTags.length === 0} />
              <a href="/" className="text-base text-black60 font-medium">
                do this later
              </a>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="px-5 flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-lg font-semibold text-black">
                Sustainable goal
              </h2>
              <p className="text-base text-black50 font-medium">
                Select the Sustainable Goal you want your household to achieve, based on the tags you previously chose.
              </p>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex flex-wrap w-full gap-3">
                
            
              {goalsData &&
                goalsData.map((goal, slide, index) => (
                  <button 
                    key={index} 
                    className={`flex flex-col rounded-2xl border-2 border-green p-5 text-left gap-y-3 m-y-2 ${
                      selectedGoals.includes(goal.goal)
                        ? "bg-green text-white"
                        : "text-green"
                    }`}
                    onClick={() => toggleGoal(goal.goal)}
                  >
                    <p>tags</p>

                    <div className="flex flex-col">
                      <h2 className="text-xs font-normal text-black">{goal.goal.slug}</h2>
                      <h1 className="font-semibold text-2xl text-black">
                        {goal.goal.title}
                      </h1>
                      <p className="font-normal text-sm text-black">{goal.goal.details}</p>
                    </div>
                    <div className="flex flex-col mb-3">
                      <p className="text-black font-normal text-xs mb-1">
                        métrica
                      </p>
                      <ProgressBar />
                    </div>
                  </button>
            ))} 
            
            </div>
            
            

            <div className="w-full flex flex-col items-end gap-y-3">
              <Button label="Select Goal" action={handleSelectGoal} />
              <a href="/" className="text-base text-black60 font-medium">
                do this later
              </a>
            </div>
          </div>
        )}
      </main>
      <BottomBar />
    </div>
  );
};

export default Goals;
