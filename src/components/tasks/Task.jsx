import React, { useEffect, useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import PropTypes from "prop-types";
import Logs from "../../data/task_logs.json";
import Users from "../../data/users.json";
import { BsArrowReturnRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PiLockSimpleThin } from "react-icons/pi";

const Task = ({ task, defaultTask, logProp, isPrivate, done, history }) => {
  const logs = Logs;
  const users = Users;
  //eslint-disable-next-line
  const [taskThisWeek, setTaskThisWeek] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userWhoDidTheTask, setUserWhoDidTheTask] = useState(null);
  const [hasComments, setHasComments] = useState(null);
  const [usersWhoCommented, setUsersWhoCommented] = useState([]);
  const [authHousehold, setAuthHousehold] = useState(null);
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
    if (task && logs && users && authHousehold) {
      if (!logProp) {
        const isTaskThisWeek = logs.filter(
          (log) =>
            log.household_id === authHousehold.id &&
            log.task_id === task.id &&
            log.start === getWeekInterval().startDate &&
            log.end === getWeekInterval().endDate
        );

        if (!defaultTask && isTaskThisWeek.length > 0) {
          const thisWeekTask = isTaskThisWeek[0];
          setTaskThisWeek(thisWeekTask);
          if (thisWeekTask.completed) {
            setIsCompleted(true);
          } else {
            setIsCompleted(false);
          }
          if (thisWeekTask.comments && thisWeekTask.comments.length > 0) {
            setHasComments(thisWeekTask.comments);
          } else {
            setHasComments(null);
          }
          const userWhoDidTheTask = users.find(
            (user) => user.id === thisWeekTask.user_id
          );
          if (userWhoDidTheTask) {
            console.log(userWhoDidTheTask);
            setUserWhoDidTheTask(userWhoDidTheTask);
          }
        } else {
          setTaskThisWeek(null);
          setIsCompleted(false);
          setHasComments(null);
          setUserWhoDidTheTask(null);
        }
      } else {
        setTaskThisWeek(task);
        if (logProp.completed) {
          setIsCompleted(true);
        } else {
          setIsCompleted(false);
        }
        if (logProp.comments && logProp.comments.length > 0) {
          setHasComments(logProp.comments);
        } else {
          setHasComments(null);
        }
        const userWhoDidTheTask = users.find(
          (user) => user.id === logProp.user_id
        );
        if (userWhoDidTheTask) {
          setUserWhoDidTheTask(userWhoDidTheTask);
        }
      }
    }
  }, [task, logs, users, defaultTask, logProp, authHousehold]);

  useEffect(() => {
    if (hasComments) {
      hasComments.map((comment) => {
        const user = users.filter((user) => user.id === comment.user_id);
        if (user) {
          setUsersWhoCommented((usersWhoCommented) => [
            ...usersWhoCommented,
            user[0],
          ]);
        }
      });
    }
  }, [hasComments]);

  return (
    ((done && isCompleted) || (!done && !isCompleted) || history) && (
      <>
        <div
          className={`w-full rounded-2xl flex items-center justify-between py-3 px-2 ${
            isCompleted && !defaultTask && "opacity-60"
          }`}
          style={{ backgroundColor: task.color }}
        >
          <Link to={`/tasks/${task.id}`} className="flex items-center gap-x-2">
            {!defaultTask && (
              <img
                src={
                  userWhoDidTheTask &&
                  //eslint-disable-next-line
                  require(`../../assets/data/users/${userWhoDidTheTask.img}`)
                }
                alt="User Profile Picture"
                className="w-[40px] h-[40px] rounded-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            )}
            <Link
              to={`/tasks/${task.id}`}
              className="text-xl text-white font-medium flex items-center gap-x-2"
            >
              {task.title}
              {isPrivate && <PiLockSimpleThin className="text-2xl" />}
            </Link>
          </Link>
          <button className="text-2xl text-white">
            <RxDotsVertical />
          </button>
        </div>
        {hasComments &&
          !defaultTask &&
          usersWhoCommented &&
          usersWhoCommented != [] &&
          hasComments.map((comment, index) => (
            <div
              className={`w-full flex items-start pl-5 bg-transparent ${
                logProp && "mt-2"
              } ${!isCompleted && "opacity-60"}`}
              key={index}
            >
              <div className="flex items-start gap-x-2">
                <div className="text-black text-2xl">
                  <BsArrowReturnRight />
                </div>
                <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center relative shrink-0">
                  <img
                    src={
                      usersWhoCommented[index] &&
                      //eslint-disable-next-line
                      require(
                        `../../assets/data/users/${usersWhoCommented[index].img}`
                      )
                    }
                    alt="User Profile Picture"
                    className="w-full h-full rounded-full absolute top-0 left-0 object-cover object-center shrink-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold">
                    {usersWhoCommented[index] && usersWhoCommented[index].name}
                  </h1>
                  <p className="text-sm text-black font-normal text-wrap-2">
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </>
    )
  );
};

Task.propTypes = {
  task: PropTypes.object,
  defaultTask: PropTypes.bool,
  logProp: PropTypes.object,
  isPrivate: PropTypes.bool,
  done: PropTypes.bool,
  history: PropTypes.bool,
};

export default Task;
