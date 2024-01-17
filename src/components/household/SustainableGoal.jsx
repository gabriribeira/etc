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
          householdGoal.household_id === authHousehold.id && householdGoal.finished === false
      );
      setHouseholdGoal(householdGoalAux);
      setGoal(goals.find((goal) => goal.id === householdGoalAux.goal_id));
      console.log(householdGoalAux);
      const householdGoalLogs = goalsLogs.filter(
        (goalLog) => goalLog.goal_id === householdGoalAux.goal_id
      );
      console.log(householdGoalLogs);
      setHouseholdGoalTimes(householdGoalLogs.length);
    }
  }, [householdGoals, goalsLogs, authHousehold]);
  useEffect(() => {
    if (households) {
      let householdTagsArray = [];
      const householdTags = households.find(
        (household) => household.id === 1
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
  }, [households]);
  const handleIncrement = () => {
    console.log("Increment");
  };
  return (
    householdGoal &&
    goal &&
    householdGoalTimes && (
      <div className="flex flex-col w-full px-5 gap-y-3">
        <h2 className="text-lg text-black font-semibold">
          Sustainability
        </h2>
        <div className="flex flex-wrap items-center gap-x-3">
        {tags &&
          tags.map((tag, index) => (
            <div className="rounded-2xl border-2 border-green text-green text-base py-1 px-2" key={index} >{tag.title}</div>
          ))
        }
        </div>
        {householdGoal && householdGoalTimes && (
          <div className="flex flex-col bg-green/80 rounded-2xl p-3 text-white gap-y-3">
            <h2 className="text-lg font-light text-black">{goal.goal.slug}</h2>
            <img
              //eslint-disable-next-line
              src={require(`../../assets/data/goals/${goal.goal.img}`)}
              alt="Goal Preview Picture"
              className="w-full object-cover"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold text-2xl text-black">
                {goal.goal.title}
              </h1>
              <p className="font-light text-sm text-black">
                {goal.goal.details}
              </p>
            </div>
            <div className="flex flex-col mb-3">
              <p className="text-white font-light text-sm mb-1">
                {(householdGoalTimes * 100) / householdGoal.amount}%
              </p>
              <ProgressBar progress={householdGoalTimes} />
            </div>
            <Button
              label={"Increment"}
              action={handleIncrement}
              stroke={true}
            />
          </div>
        )}
      </div>
    )
  );
};

export default SustainableGoal;
