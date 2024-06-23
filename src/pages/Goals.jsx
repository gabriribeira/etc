import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import ProgressBar from "../components/common/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useGetGoalsByTagsQuery, useAssignGoalsToHouseholdMutation, useUpdateHouseholdTagsMutation, useGetHouseholdGoalsQuery, useGetHouseholdTagsQuery } from "../app/api";
import { useSelector } from "react-redux";
import CategoriesInput from "../components/common/CategoriesInput";

const Goals = () => {
  const household = useSelector((state) => state.auth.currentHouseholdId);
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const navigate = useNavigate();
  const { data: householdGoalsData } = useGetHouseholdGoalsQuery(household);
  const { data: householdTagsData } = useGetHouseholdTagsQuery(household);
  const [addHouseholdTags] = useUpdateHouseholdTagsMutation();
  const { data: fetchedGoals } = useGetGoalsByTagsQuery(tags, { skip: tags.length === 0 });
  const [assignGoals] = useAssignGoalsToHouseholdMutation();

  useEffect(() => {
    if (householdGoalsData?.data) {
      setSelectedGoals(householdGoalsData.data);
    }
  }, [householdGoalsData]);

  useEffect(() => {
    if (householdTagsData?.data) {
      setTags(householdTagsData.data.map(tag => tag.id));
    }
  }, [householdTagsData]);

  const toggleGoal = (goal) => {
    setSelectedGoals((prevGoals) => {
      const goalsArray = Array.isArray(prevGoals) ? prevGoals : [];
      const isGoalSelected = goalsArray.some(g => g.id === goal.id);
      if (isGoalSelected) {
        return goalsArray.filter(g => g.id !== goal.id);
      } else {
        return [...goalsArray, goal];
      }
    });
  };

  const handleTags = async () => {
    try {
      await addHouseholdTags({ householdId: household, tags }).unwrap();
      setStep(2);
    } catch (error) {
      console.error("Error adding tags:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await assignGoals({ householdId: household, goalIds: selectedGoals.map((goal) => goal.id) }).unwrap();
      navigate("/household");
    } catch (error) {
      console.error("Failed to assign goal:", error);
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex flex-col">
      <TopBar />
      {step === 1 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <div className="flex flex-col gap-y-2 pb-5">
              <h2 className="text-lg font-semibold text-black">
                Sustainable Tags
              </h2>
              <p className="text-base text-black50 font-medium">
                Select some tags that you want to define your household in terms of sustainable practices.
              </p>
            </div>
            <ProgressBar progress={2} />
            <div className="flex flex-col w-full gap-y-6 h-auto pt-5">
              <CategoriesInput
                label="Sustainable Tags"
                categorySelected={tags}
                onChange={setTags}
                filter={false}
                categoriesProps={true}
              />
            </div>
          </form>
          <div className="h-full my-6 px-5">
            <Button label="Next" action={handleTags} />
          </div>
        </main>
      )}
      {step === 2 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <div className="flex flex-col gap-y-2 mb-5">
              <h2 className="text-lg font-semibold text-black">
                Sustainable Goals
              </h2>
              <p className="text-base text-black50 font-medium">
                Select goals that you want to achieve as a household in terms of sustainable practices.
              </p>
            </div>
            <ProgressBar progress={8} />
            <div className="flex flex-col w-full gap-y-6 h-auto mt-5">
              {Array.isArray(fetchedGoals?.data) && fetchedGoals.data.map((goal, index) => (
                <button
                  key={index}
                  className={`flex flex-col rounded-2xl border-2 border-green p-5 text-left gap-y-3 my-2 ${Array.isArray(selectedGoals) && selectedGoals.some(g => g.id === goal.id)
                    ? "bg-green text-white"
                    : "text-green"
                    }`}
                  onClick={() => toggleGoal(goal)}
                  type="button"
                >
                  <p>{goal.amount} times in 1 month</p>
                  <div className="flex flex-col">
                    <h2 className="text-xs font-normal text-black">{goal.slug}</h2>
                    <h1 className="font-semibold text-2xl text-black">
                      {goal.title}
                    </h1>
                    <p className="font-normal text-sm text-black">{goal.details}</p>
                  </div>
                </button>
              ))}
            </div>
          </form>
          <div className="h-full my-6 px-5">
            <Button label="Next" action={handleSubmit} />
          </div>
        </main>
      )}
      <BottomBar />
    </div>
  );
};

export default Goals;