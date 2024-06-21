import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import ProgressBar from "../components/common/ProgressBar";
import { useNavigate } from 'react-router-dom';
import { useGetGoalsByTagsQuery, useAssignGoalsToHouseholdMutation, useAddHouseholdTagsMutation, useGetHouseholdGoalsQuery, useGetHouseholdTagsQuery } from "../app/api";
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
  const [addHouseholdTags] = useAddHouseholdTagsMutation();
  const { data: fetchedGoals } = useGetGoalsByTagsQuery(tags?.map((tag) => tag.id));
  const [assignGoals] = useAssignGoalsToHouseholdMutation();

  useEffect(() => {
    if (householdGoalsData?.data?.length > 0 && householdTagsData?.data?.length > 0) {
      setSelectedGoals(householdGoalsData.data);
      setTags(householdTagsData.data);
    }
  }, [householdGoalsData, householdTagsData]);

  const toggleGoal = (goal) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleTags = async () => {
    try {
      await addHouseholdTags({ householdId: household, tags: tags.map((tag) => tag.id) }).unwrap();
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
      console.error('Failed to assign goal:', error);
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex flex-col">
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
                <CategoriesInput label={"Sustainable Tags"} categorySelected={tags} onChange={setTags} filter={false} />
              </div>
            </form>
            <div className="h-full my-6 px-5">
              <Button
                label="Next"
                action={handleTags}
              />
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
                  Select a goals that you want to achieve as a household in terms of sustainable practices.
                </p>
              </div>
              <ProgressBar progress={8} />
              <div className="flex flex-col w-full gap-y-6 h-auto mt-5">
                {fetchedGoals && fetchedGoals.data &&
                  fetchedGoals.data.map((goal, slide, index) => (
                    <button
                      key={index}
                      className={`flex flex-col rounded-2xl border-2 border-green p-5 text-left gap-y-3 m-y-2 ${selectedGoals.includes(goal)
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
              <Button
                label="Next"
                action={handleSubmit}
              />
            </div>
          </main>
        )}
        <BottomBar />
      </div>
    </div>
  );
};


export default Goals;