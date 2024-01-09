import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import Task from "../components/tasks/Task";
import { TbArrowsSort } from "react-icons/tb";
import TasksData from "../data/tasks.json";

const Tasks = () => {
  const [householdTasks, setHouseholdTasks] = useState(null);
  const tasks = TasksData;
  useEffect(() => {
    if (tasks) {
      const householdTasks = tasks.filter((task) => task.household_id === 1); // NÃO ESQUECER ALTERAR PARA HOUSEHOLD CORRETO
      setHouseholdTasks(householdTasks);
    }
  }, [tasks]);
  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-5">
        <Button to={"/task-manager"} label="Manage Tasks" stroke={true} />
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between w-full mb-2">
            <h1 className="font-semibold text-lg">This Week</h1>
            <button className="text-blue text-lg flex gap-x-1 items-center">
              <span className="text-2xl">
                <TbArrowsSort />
              </span>
              filter
            </button>
          </div>
          {householdTasks && householdTasks.map((element, index) => (
            <Task task={element} key={index} />
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};
export default Tasks;
