import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import ToggleSwitch from "../components/common/ToggleSwitch";
import HoseholdData from "../data/households.json";
import Task from "../components/tasks/Task";
import UserData from "../data/users.json";

const TaskManager = () => {
  const households = HoseholdData;
  const userData = UserData;
  const [householdTasks, setHouseholdTasks] = useState(null);
  const [userTasks, setUserTasks] = useState(null);
  const [authUser, setAuthUser] = useState(null);
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
    if (households) {
      const householdTasks = households.filter(
        (household) => household.id === 1
      ); // NÃO ESQUECER ALTERAR PARA HOUSEHOLD CORRETO
      setHouseholdTasks(householdTasks[0].tasks);
    }
    if (userData && authUser) {
      const userTasks = userData.filter((user) => user.id === authUser.id);
      setUserTasks(userTasks[0].tasks);
    }
  }, [households, userData, authUser]);
  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-6">
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
        <div className="flex flex-col gap-y-3">
          <h1 className="font-semibold text-lg">Household Tasks</h1>
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
              <Task task={task} key={index} defaultTask={true} />
            ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};
export default TaskManager;
