import React, { useEffect, useState } from "react";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import { useSelector } from "react-redux";
import {
  useGetHouseholdGoalsQuery,
  useGetHouseholdTagsQuery,
  useIncrementGoalMutation,
  useGetCompletedHouseholdGoalsQuery,
  useLazyGetHouseholdGoalProgressQuery,
} from "../../app/api";
import { Link } from "react-router-dom";
import { useNavigationType } from "react-router-dom";
import NotificationPopup from "../common/NotificationPopup";

const SustainableGoal = () => {
  const [popup, setPopup] = useState({ message: "", isVisible: false });
  const householdId = useSelector((state) => state.auth.currentHouseholdId);
  const userId = useSelector((state) => state.auth.user?.id);
  const { data: householdGoalsData, isLoading: isHouseholdGoalsLoading, refetch: refetchGetHouseholdGoals } = useGetHouseholdGoalsQuery(householdId, {
    skip: !householdId,
  });
  const { data: householdTagsData, isLoading: isHouseholdTagsLoading, refetch: refetchGetTags } = useGetHouseholdTagsQuery(householdId, {
    skip: !householdId,
  });
  const { data: completedGoalsData, isLoading: isCompletedGoalsLoading, refetch: refetchCompletedHouseholdGoals } = useGetCompletedHouseholdGoalsQuery(householdId, {
    skip: !householdId,
  });
  const [getHouseholdGoalProgress] = useLazyGetHouseholdGoalProgressQuery();


  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      refetchGetHouseholdGoals();
      refetchGetTags();
      refetchCompletedHouseholdGoals();
    }
  }, [navigationType, refetchGetHouseholdGoals, refetchGetTags, refetchCompletedHouseholdGoals]);

  const [householdGoals, setHouseholdGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [tags, setTags] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [incrementGoal] = useIncrementGoalMutation();

  useEffect(() => {
    if (householdGoalsData?.data?.length > 0 && householdTagsData?.data?.length > 0) {
      setHouseholdGoals(householdGoalsData.data);
      setTags(householdTagsData.data);
    }
  }, [householdGoalsData, householdTagsData]);

  useEffect(() => {
    if (completedGoalsData?.data?.length > 0) {
      setCompletedGoals(completedGoalsData.data);
    }
  }, [completedGoalsData]);

  useEffect(() => {
    if (householdGoals.length > 0) {
      householdGoals.forEach(async (goal) => {
        const progress = await getHouseholdGoalProgress(goal.id).unwrap();
        setProgressData((prevData) => ({
          ...prevData,
          [goal.id]: progress.data.length,
        }));
      });
    }
  }, [householdGoals, getHouseholdGoalProgress]);

  const handleIncrement = async (householdGoalId) => {
    try {
      const response = await incrementGoal({ householdGoalId, userId }).unwrap();
      setPopup({ message: response.status != "fail" ? "Goal Incremented" : response.status, isVisible: true });
      if (response.is_completed) {
        refetchGetHouseholdGoals();
      } else if (response) {
        setProgressData((prevData) => ({
          ...prevData,
          [householdGoalId]: prevData[householdGoalId] + 1,
        }));
        
        const updatedGoals = householdGoals.map(goal =>
          goal.id === householdGoalId ? { ...goal, Goal_Records: [...goal.Goal_Records, response] } : goal
        );
        setHouseholdGoals(updatedGoals);
      }
    } catch (error) {
      console.error('Error incrementing goal:', error);
    }
  };

  if (isHouseholdGoalsLoading || isHouseholdTagsLoading || isCompletedGoalsLoading) return <div>Loading...</div>;

  return (
    <>
      <NotificationPopup
        message={popup.message}
        isVisible={popup.isVisible}
        onClose={() => setPopup({ ...popup, isVisible: false })}
      />
      {(householdGoals?.length > 0 || tags.length > 0) ? (
        <div className="flex flex-col w-full px-5 gap-y-3">
          <h2 className="text-lg text-black font-semibold">Sustainability</h2>
          {tags && tags.length > 0 &&
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, index) => (
                <div
                  className="rounded-2xl text-white bg-green bg-gradient-to-r from-green to-white/30 text-base py-1 px-3"
                  key={index}
                >
                  {tag.title}
                </div>
              ))}
            </div>
          }
          {householdGoals && householdGoals.length > 0 &&
            <div className="flex overflow-x-scroll space-x-3">
              {householdGoals.map((goal, index) => (
                <div key={index} className="flex-shrink-0 w-72 bg-green bg-gradient-to-br from-black/30 to-white/70 rounded-2xl p-5 text-white justify-between flex flex-col">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-medium text-white">{goal.Goal.slug}</h2>
                    <div className="flex flex-col">
                      <h1 className="font-medium text-2xl text-black">{goal.Goal.title}</h1>
                      <p className="font-normal text-sm text-black">{goal.Goal.details}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <p className="text-black font-base text-sm mb-1">
                      {progressData[goal.id] || 0} / {goal.Goal.amount}
                    </p>
                    <ProgressBar progress={(progressData[goal.id] || 0) / goal.Goal.amount * 100} />
                  </div>
                  <Button label={"Increment"} action={() => handleIncrement(goal.id)} />
                </div>
              ))}
            </div>
          }
          {completedGoals && completedGoals.length > 0 &&
            <div className="">
              <h2 className="text-lg text-black font-semibold">Completed Goals</h2>
              <div className="grid grid-cols-2 gap-2">
                {completedGoals.map((goal, index) => (
                  <div key={index} className="col-span-1 flex flex-col items-start bg-salmon bg-gradient-to-br from-yellow-500 to-white/50 rounded-2xl p-2">
                    <h1 className="font-semibold text-sm text-black leading-none">{goal.Goal.slug}</h1>
                    <p className="text-[11px] text-black mt-1">{new Date(goal.updatedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      ) : (
        <div className="flex flex-col w-full px-5 gap-y-3">
          <h2 className="text-lg text-black font-semibold">Sustainability</h2>
          <Link to="/goals" className="text-white bg-green p-3 rounded-2xl flex flex-col">
            <h1 className="font-bold text-2xl">Start a Goal today!</h1>
            <p className="text-md font-light leading-none mt-2">Mini challenges for your household to implement sustainable practices, the easy way! Choose your favorite theme and start today.</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default SustainableGoal;