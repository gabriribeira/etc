import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
//import ToggleSwitch from "../components/common/ToggleSwitch";
import Task from "../components/tasks/Task";
import TasksData from "../data/tasks.json";
import NewButton from "../components/common/NewButton";

const TaskManager = () => {
  const tasks = TasksData;
  const [householdTasks, setHouseholdTasks] = useState(null);
  const [userTasks, setUserTasks] = useState(null);
  const [authUser, setAuthUser] = useState(null);
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

    const storedUser = getCookieValue("user");
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);
  useEffect(() => {
    if (tasks && authHousehold) {
      const householdTasks = tasks.filter((task) => task.household_id === authHousehold.id);
      console.log(householdTasks);
      setHouseholdTasks(householdTasks);
    }
    if (tasks && authUser) {
      const userTasks = tasks.filter(
        (task) => task.user_id === authUser.id && task.isPrivate === true
      );
      setUserTasks(userTasks);
    }
  }, [tasks, authUser, authHousehold]);
  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-6">
        {/*
        <div className="flex flex-col">
          <div className=" flex items-center gap-x-3">
            <ToggleSwitch />
            <h2 className="text-lg font-semibold">Automatic Attribution</h2>
          </div>
          <p className="text-black60 text-base mt-2">
            Household tasks will be automatically attributed to different
            members weekly. You can always change the assigned user.
          </p>
        </div>
  */}
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">Household Tasks</h1>
            <p className="text-black60 text-base">
              Every member of the household can see these tasks and they can be
              attributed to anyone.
            </p>
          </div>
          {householdTasks &&
            householdTasks.map((task, index) => (
              <Task task={task} key={index} defaultTask={true} />
            ))}
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">Private Tasks</h1>
            <p className="text-black60 text-base">
              Personal tasks will not appear to the other members of the
              household and cannot be assigned
            </p>
          </div>
          {userTasks &&
            userTasks.map((task, index) => (
              <Task task={task} key={index} defaultTask={true} isPrivate={true} />
            ))}
        </div>
      </div>
      <NewButton path={"/tasks/new"} />
      <BottomBar />
    </div>
  );
};
export default TaskManager;
