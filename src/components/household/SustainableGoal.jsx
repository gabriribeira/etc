import React, { useEffect, useState } from "react";
import HouseholdGoals from "../../data/households_goals.json";
import GoalsLogs from "../../data/goals_logs.json";
import Goals from "../../data/goals.json";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import HouseholdsData from "../../data/households.json";

const SustainableGoal = () => {
  const householdGoals = HouseholdGoals;
  const goalsLogs = GoalsLogs;
  const goals = Goals;
  const households = HouseholdsData;
  const [householdGoal, setHouseholdGoal] = useState(null);
  const [goal, setGoal] = useState(null);
  const [householdGoalTimes, setHouseholdGoalTimes] = useState(null);
  const [tags, setTags] = useState(null);
  const [authHousehold, setAuthHousehold] = useState(null);
  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };
    const storedHousehold = getCookieValue("household");
    if (storedHousehold) {
      setAuthHousehold(storedHousehold);
    }
  }, []);
  useEffect(() => {
    if (householdGoals && goalsLogs && authHousehold) {
      const householdGoalAux = householdGoals.find(
        (householdGoal) =>
          householdGoal.household_id === authHousehold.id &&
          householdGoal.finished === false
      );
      setHouseholdGoal(householdGoalAux);
      if (householdGoalAux) {
        setGoal(goals.find((goal) => goal.id === householdGoalAux.goal_id));
        console.log(householdGoalAux);
        const householdGoalLogs = goalsLogs.filter(
          (goalLog) => goalLog.goal_id === householdGoalAux.goal_id
        );
        console.log(householdGoalLogs);
        setHouseholdGoalTimes(householdGoalLogs.length);
      }
    }
  }, [householdGoals, goalsLogs, authHousehold]);
  useEffect(() => {
    if (households && authHousehold) {
      let householdTagsArray = [];
      const householdTags = households.find(
        (household) => household.id === authHousehold.id
      ).tags;
      householdTags.forEach((tag) => {
        goals.forEach((goal) => {
          if (goal.id === tag) {
            householdTagsArray.push(goal);
          }
        });
      });
      setTags(householdTagsArray);
    }
  }, [households, authHousehold]);
  const handleIncrement = () => {
    if (householdGoalTimes < householdGoal.amount) {
      const newGoalLog = {
        id: goalsLogs.length + 1,
        goal_id: householdGoal.goal_id,
        household_id: householdGoal.household_id,
        created_at: new Date().toISOString().split("T")[0],
      };
      goalsLogs.push(newGoalLog);
      setHouseholdGoalTimes(householdGoalTimes + 1);
    }
  };
  return householdGoal && goal && householdGoalTimes ? (
    <div className="flex flex-col w-full px-5 gap-y-3">
      <h2 className="text-lg text-black font-semibold">Sustainability</h2>
      <div className="flex flex-wrap items-center gap-x-3">
        {tags &&
          tags.map((tag, index) => (
            <div
              className="rounded-2xl text-white bg-green bg-gradient-to-r from-green to-white/30 text-base py-1 px-3"
              key={index}
            >
              {tag.title}
            </div>
          ))}
      </div>
      {householdGoal && householdGoalTimes && (
        <div className="flex flex-col bg-green bg-gradient-to-br from-black/30 to-white/70 rounded-2xl p-5 text-white gap-y-3">
          <h2 className="text-lg font-medium text-white">{goal.goal.slug}</h2>
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/goals/${goal.goal.img}`)}
            alt="Goal Preview Picture"
            className="w-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="font-medium text-2xl text-black">
              {goal.goal.title}
            </h1>
            <p className="font-normal text-sm text-black">{goal.goal.details}</p>
          </div>
          <div className="flex flex-col mb-3">
            <p className="text-black font-base text-sm mb-1">
              {(householdGoalTimes * 100) / householdGoal.amount}%
            </p>
            <ProgressBar progress={householdGoalTimes} />
          </div>
          <Button label={"Increment"} action={handleIncrement} />
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col bg-green/80 rounded-2xl p-3 text-white gap-y-3 mx-5">
      <h2 className="text-lg font-light text-white">Household Goal</h2>
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl text-white">
          Start a new goal today!
        </h1>
      </div>
    </div>
  );
};

export default SustainableGoal;
