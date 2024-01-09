import React, { useEffect, useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import PropTypes from "prop-types";
import Logs from "../../data/task_logs.json";
import Users from "../../data/users.json";
import { BsArrowReturnRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Task = ({ task, defaultTask }) => {
  const logs = Logs;
  const users = Users;
  //eslint-disable-next-line
  const [taskThisWeek, setTaskThisWeek] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userWhoDidTheTask, setUserWhoDidTheTask] = useState(null);
  const [hasComments, setHasComments] = useState(null);
  const [usersWhoCommented, setUsersWhoCommented] = useState([]);
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
    if (task && logs && users) {
      const isTaskThisWeek = logs.filter(
        (log) =>
          log.household_id === 1 && // NÃO ESQUECER ALTERAR PARA HOUSEHOLD CORRETO
          log.task_id === task.id &&
          log.start == getWeekInterval().startDate &&
          log.end == getWeekInterval().endDate
      );
      if (!defaultTask) {
        if (isTaskThisWeek) {
          setTaskThisWeek(isTaskThisWeek[0]);
          if (isTaskThisWeek[0] && isTaskThisWeek[0].completed) {
            setIsCompleted(true);
          } else {
            setIsCompleted(false);
          }
          if (
            isTaskThisWeek[0] &&
            isTaskThisWeek[0].comments &&
            isTaskThisWeek[0].comments.length > 0
          ) {
            setHasComments(isTaskThisWeek[0].comments);
          } else {
            setHasComments(null);
          }
          const userWhoDidTheTask = users.filter(
            (user) => user.id === isTaskThisWeek[0].user_id
          );
          if (userWhoDidTheTask) {
            setUserWhoDidTheTask(userWhoDidTheTask[0]);
          }
        } else {
          return null;
        }
      } else {
        setTaskThisWeek(isTaskThisWeek[0]);
        if (isTaskThisWeek[0] && isTaskThisWeek[0].completed) {
          setIsCompleted(true);
        } else {
          setIsCompleted(false);
        }
        if (
          isTaskThisWeek[0] &&
          isTaskThisWeek[0].comments &&
          isTaskThisWeek[0].comments.length > 0
        ) {
          setHasComments(isTaskThisWeek[0].comments);
        } else {
          setHasComments(null);
        }
      }
    }
  }, [task, logs, users]);

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
            />
          )}
          <Link
            to={`/tasks/${task.id}`}
            className="text-xl text-white font-medium"
          >
            {task.title}
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
              isCompleted && "opacity-60"
            }`}
            key={index}
          >
            <div className="flex items-start gap-x-2">
              <div className="text-black text-2xl">
                <BsArrowReturnRight />
              </div>
              <img
                src={
                  usersWhoCommented[index] &&
                  //eslint-disable-next-line
                  require(
                    `../../assets/data/users/${usersWhoCommented[index].img}`
                  )
                }
                alt="User Profile Picture"
                className="w-[30px] h-[30px] rounded-full object-cover object-center"
              />
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
  );
};

Task.propTypes = {
  task: PropTypes.object,
  defaultTask: PropTypes.bool,
};

export default Task;
