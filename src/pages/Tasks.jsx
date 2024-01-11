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
  useEffect(() => {
    if (tasks) {
      const householdTasks = tasks.filter((task) => task.household_id === 1); // NÃO ESQUECER ALTERAR PARA HOUSEHOLD CORRETO
      setHouseholdTasks(householdTasks);
    }
  }, [tasks]);
  useEffect(() => {
    console.log(appliedFilters);
  }, [appliedFilters]);
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
                <Task task={element} key={index} />
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
