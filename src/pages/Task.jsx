import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { useLocation } from "react-router-dom";
import TasksData from "../data/tasks.json";
import TaskLogsData from "../data/task_logs.json";
import TaskComp from "../components/tasks/Task";
import ToggleSwitch from "../components/common/ToggleSwitch";
const Task = () => {
  const location = useLocation();
  const [task, setTask] = useState(null);
  const [log, setLog] = useState(null);
  const [logs, setLogs] = useState(null);
  const [checked, setChecked] = useState(false);
  const tasks = TasksData;
  const taskLogs = TaskLogsData;
  useEffect(() => {
    if (location.pathname && location.pathname.split("/")[2] && tasks) {
      console.log(location.pathname.split("/")[2]);
      const task = tasks.filter(
        (task) => task.id == location.pathname.split("/")[2]
      );
      setTask(task[0]);
      setChecked(task[0].automatic);
      if (task[0]) {
        const log = taskLogs.filter(
          (log) => log.task_id == location.pathname.split("/")[2]
        );
        console.log(log);
        setLog(log[0]);
      }
    }
  }, [location.pathname, tasks]);
  useEffect(() => {
    if (taskLogs) {
      const taskLogsAux = taskLogs.filter(
        (log) => log.task_id == location.pathname.split("/")[2]
      );
      setLogs(taskLogsAux);
    }
  }, [taskLogs]);
  return (
    task &&
    logs && (
      <div>
        <TopBar text={task.title} description={task.details} />
        <div className="flex flex-col px-5 gap-y-6">
          {!task.isPrivate && (
            <div className="flex flex-col">
              <div className=" flex items-center gap-x-3">
                <ToggleSwitch checked={checked} onChange={() => setChecked(!checked)} />
                <h2 className="text-lg font-semibold">Automatic Attribution</h2>
              </div>
              <p className="text-black60 text-base mt-2">
                If on, this task is being automatically attributed to different members
                weekly.
              </p>
            </div>
          )}
          <div className="flex flex-col gap-y-3">
            <h1 className="font-semibold text-lg">This Week</h1>
            <TaskComp task={task} logProp={log} history={true} />
          </div>
          <h1 className="font-semibold text-lg">Task History</h1>
          <div className="flex flex-col gap-y-3">
            {logs &&
              logs.map((log, index) => (
                <div key={index} className="gap-y-3">
                  <p className="text-black50">
                    {log.completed
                      ? log.completed
                      : "Uncompleted " + log.start + " - " + log.end}
                  </p>
                  <TaskComp task={task} logProp={log} history={true} />
                </div>
              ))}
          </div>
          <div className="flex items-center justify-center text-base text-black50">
            Tasked created at {task.created_at && task.created_at}
          </div>
        </div>
        <BottomBar />
      </div>
    )
  );
};

export default Task;
