import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import Task from "../components/tasks/Task";
import { BsFilterCircle } from "react-icons/bs";
import TasksData from "../data/tasks.json";
import FilterOverlay from "../components/common/FilterOverlay";

const Tasks = () => {
  const [householdTasks, setHouseholdTasks] = useState(null);
  const tasks = TasksData;
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);
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
    if (tasks && authHousehold) {
      const householdTasks = tasks.filter((task) => task.household_id === authHousehold.id);
      setHouseholdTasks(householdTasks);
    }
  }, [tasks, authHousehold]);
  useEffect(() => {
    console.log(appliedFilters);
  }, [appliedFilters, authHousehold]);
  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-5">
        <Button to={"/task-manager"} label="Manage Tasks" stroke={true} />
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">This Week&apos;s Tasks</h1>
            <p className="text-black50">
              These are the household&apos;s tasks for the week. Each Monday,
              they are updated. Only you can see your private tasks here.
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between w-full mb-2">
              <h1 className="font-semibold text-lg">Active</h1>
              <button
                onClick={() => setShowFilters(true)}
                className="text-blue text-lg flex gap-x-1 items-center focus:outline-none"
              >
                <span className="text-2xl">
                  <BsFilterCircle />
                </span>
                filter
              </button>
            </div>
            {householdTasks &&
              householdTasks.map((element, index) => (
                <Task task={element} key={index} done={false} />
              ))}
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between w-full mb-2">
              <h1 className="font-semibold text-lg">Done</h1>
            </div>
            {householdTasks &&
              householdTasks.map((element, index) => (
                <Task task={element} key={index} done={true} />
              ))}
          </div>
        </div>
      </div>
      <BottomBar />
      {showFilters && (
        <FilterOverlay
          appliedFilters={appliedFilters}
          setFilter={setAppliedFilters}
          hideFilters={() => setShowFilters(false)}
          filters={["State", "Include", "Category"]}
        />
      )}
    </div>
  );
};
export default Tasks;
