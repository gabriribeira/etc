import React, { useState, useEffect } from "react";
import ProgressBar from "../common/ProgressBar";
import UsersData from "../../data/users.json";
import ListsData from "../../data/lists.json";
import ListsItemsData from "../../data/items.json";
import TasksLogs from "../../data/task_logs.json";
import ExpensesData from "../../data/expenses.json";
import HouseholdGoals from "../../data/households_goals.json";
import GoalsLogs from "../../data/goals_logs.json";
import Goals from "../../data/goals.json";
import { Link } from "react-router-dom";
import WidgetIcon from "../common/WidgetIcon";

const Widgets = () => {
  const usersData = UsersData;
  const listsData = ListsData;
  const listsItemsData = ListsItemsData;
  const tasksLogs = TasksLogs;
  const expensesData = ExpensesData;
  const householdGoals = HouseholdGoals;
  const goalsLogs = GoalsLogs;
  const goals = Goals;
  const [list, setList] = useState([]);
  const [numberItems, setNumberItems] = useState(0);
  //eslint-disable-next-line
  const [tasks, setTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [authUser, setAuthUser] = useState(null);
  const [balances, setBalances] = useState(null);
  const [youOwe, setYouOwe] = useState(null);
  const [youAreOwed, setYouAreOwed] = useState(null);
  const [householdGoal, setHouseholdGoal] = useState(null);
  const [goal, setGoal] = useState(null);
  //eslint-disable-next-line
  const [householdGoalTimes, setHouseholdGoalTimes] = useState(null);

  // Get authenticated household
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

  // Get authenticated user
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

  //Shopping Lists Widget
  useEffect(() => {
    if (listsData && authHousehold) {
      if (listsData.filter((list) => list.household_id === authHousehold.id)) {
        if (
          listsData
            .filter((list) => list.household_id === authHousehold.id)
            .find((list) => list.finished === false)
        ) {
          setList(
            listsData
              .filter((list) => list.household_id === authHousehold.id)
              .find((list) => list.finished === false).title
          );
          setNumberItems(
            listsItemsData.filter(
              (listItem) =>
                listItem.list_id ===
                listsData
                  .filter((list) => list.household_id === authHousehold.id)
                  .find((list) => list.finished === false).id
            ).length
          );
        } else {
          setList("");
          setNumberItems(0);
        }
      } else {
        setList("");
      }
    }
  }, [listsData, authHousehold]);

  //Tasks Widget
  useEffect(() => {
    const getWeekInterval = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const daysUntilMonday = (currentDay + 6) % 7;

      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - daysUntilMonday);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };
    };
    if (tasksLogs && authUser && authUser) {
      const weekStart = getWeekInterval().startDate;
      const weekEnd = getWeekInterval().endDate;
      if (
        tasksLogs.filter(
          (task) =>
            task.household_id === authHousehold.id &&
            task.user_id === authUser.id &&
            task.start === weekStart &&
            task.end === weekEnd
        )
      ) {
        setTasks(
          tasksLogs.filter(
            (task) =>
              task.household_id === authHousehold.id &&
              task.user_id === authUser.id &&
              task.start === weekStart &&
              task.end === weekEnd
          ).length
        );
        tasksLogs
          .filter(
            (task) =>
              task.household_id === authHousehold.id &&
              task.user_id === authUser.id &&
              task.start === weekStart &&
              task.end === weekEnd
          )
          .map((task) => {
            if (task.completed === true) {
              setCompletedTasks(completedTasks + 1);
            }
          });
      }
    }
  }, [tasksLogs, authHousehold, authUser]);

  // Expenses Widget
  useEffect(() => {
    if (expensesData && usersData && authUser) {
      const calculatedBalances = calculateBalances(
        expensesData,
        usersData,
        authUser.id,
        authHousehold.id
      );
      setBalances(calculatedBalances);
    }
  }, [expensesData, usersData, authUser]);
  const calculateBalances = (
    expenses,
    users,
    authenticatedUserId,
    authenticatedHouseholdId
  ) => {
    const userBalances = {};
    users.forEach((user) => {
      userBalances[user.id] = 0;
    });
    expenses.forEach((expense) => {
      // Check if the expense is within the same household
      if (expense.household_id === authenticatedHouseholdId) {
        if (!expense.paid) {
          const numberOfUsers = expense.users.length || 1;
          const amountPerUser = expense.value / numberOfUsers;
          userBalances[expense.user_id] += expense.value;

          expense.users.forEach((userId) => {
            if (userId !== authenticatedUserId) {
              userBalances[userId] -= amountPerUser;
            }
          });
        }
      }
    });

    return userBalances;
  };

  useEffect(() => {
    let youOwe = null;
    let youAreOwed = null;
    if (balances) {
      Object.values(balances).forEach((balance, index) => {
        if (index + 1 != authUser.id) {
          if (balance > 0) {
            if (youOwe) {
              if (balance > youOwe) {
                youOwe = balance;
              }
            } else if (!youOwe) {
              youOwe = balance;
            }
          } else if (balance < 0) {
            if (youAreOwed) {
              if (balance < youAreOwed) {
                youAreOwed = balance;
              }
            } else if (!youAreOwed) {
              youAreOwed = balance;
            }
          }
        }
      });
      setYouOwe(youOwe);
      setYouAreOwed(youAreOwed);
    }
  }, [balances]);

  // Household Goal Widget
  useEffect(() => {
    if (householdGoals && goalsLogs && authHousehold) {
      const householdGoal = householdGoals.find(
        (householdGoal) =>
          householdGoal.household_id === authHousehold.id &&
          householdGoal.finished === false
      );
      setHouseholdGoal(householdGoal);
      if (householdGoal) {
        setGoal(goals.find((goal) => goal.id === householdGoal.goal_id));
        const householdGoalLogs = goalsLogs.filter(
          (goalLog) => goalLog.goal_id === householdGoal.goal_id
        );
        setHouseholdGoalTimes(householdGoalLogs.length);
      }
    }
  }, [householdGoals, goalsLogs, authHousehold]);

  return (
    <div className="flex flex-col w-full gap-y-3">
      <Link
        to={"/lists"}
        className="w-full rounded-2xl p-3 bg-blue80 text-white relative"
      >
        <WidgetIcon icon={"lists"} />
        <h2 className="text-base font-light">Shopping Lists</h2>
        <h1
          className={list ? `font-semibold text-4xl` : `font-medium text-2xl mt-5`}
        >
          {list && list != "" ? numberItems : "Start a new list"}
        </h1>
        <p className="font-light text-base">
          {list && list != "" ? "items in " : ""}
          <span className="font-semibold">
            {list && list != "" ? list : ""}
          </span>
        </p>
      </Link>
      <div className="flex w-full gap-x-3 text-white">
        
        <Link
          to={"/expenses"}
          className="w-full bg-salmon bg-gradient-to-l shadow-lg from-salmon to-black90/40 rounded-2xl p-3 h-[200px] flex flex-col justify-between relative"
        >
          <WidgetIcon icon={"expenses"} />
          <h2 className="text-base font-light">Expenses</h2>
          <div className="flex flex-col">
            {youOwe || youAreOwed ? (
              <h1 className="font-semibold text-4xl">
                {youOwe
                  ? Math.abs(youOwe.toFixed(2))
                  : Math.abs(youAreOwed.toFixed(2))}
                <span className="font-light text-3xl">€</span>
              </h1>
            ) : (
              <h1 className="font-semibold text-4xl">
                0<span className="font-light text-3xl">€</span>
              </h1>
            )}
            <p className="font-light text-base">
              {(youOwe || youAreOwed) && youOwe ? "left to pay" : "to receive"}
            </p>
          </div>
        </Link>
      </div>
      {householdGoal && authHousehold ? (
        <Link
          to={`/household`}
          className="flex flex-col bg-green bg-gradient-to-l shadow-lg from-green to-black90/40 rounded-2xl p-3 text-white relative"
        >
          <WidgetIcon icon={"goal"} />
          <h2 className="text-base font-light">Household Goal</h2>
          <div className="flex flex-col mt-2">
            <h1 className="font-semibold text-5xl">
              {householdGoalTimes}/{householdGoal.amount}
            </h1>
            <p className="font-light text-base">
              times to achieve{" "}
              <span className="font-semibold">{goal.goal.slug}</span>
            </p>
          </div>
          <div className="flex flex-col mt-2">
            <p className="text-white font-light text-sm mb-1">
              {(householdGoalTimes * 100) / householdGoal.amount}%
            </p>
            <ProgressBar progress={householdGoalTimes} />
          </div>
        </Link>
      ) : (
        <div
          className="flex flex-col bg-green rounded-2xl p-3 text-white relative"
        >
          <WidgetIcon icon={"goal"} />
          <h2 className="text-base font-light">Household Goal</h2>
          <div className="flex flex-col mt-2">
            <h1 className="font-medium text-2xl mt-5">
              Start a new goal
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widgets;
