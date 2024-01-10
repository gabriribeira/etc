import React, { useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ToggleSwitch from "../components/common/ToggleSwitch";
import InputDropdown from "../components/common/InputDropdown";
import CategoriesInput from "../components/common/CategoriesInput";
import TasksData from "../data/tasks.json";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const tasks = TasksData;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [automatic, setAutomatic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [repeat, setRepeat] = useState(null);
  const [category, setCategory] = useState(null);
  const handleTaskCreation = async () => {
    if (title && details && repeat && category) {
      const newTask = {
        id: tasks.length + 1,
        title: title,
        details: details,
        periodicity: repeat,
        isPrivate: isPrivate,
        household_id: isPrivate ? null : 1, // NÃO ESQUECER ALTERAR PARA HOUSEHOLD CORRETO
        user_id: isPrivate ? 1 : null, // NÃO ESQUECER ALTERAR PARA USER CORRETO
        automatic: automatic,
        category: category.title,
        color: category.color,
        created_at: new Date().toISOString().slice(0, 10),
      };
      try {
        tasks.push(newTask);
        console.log("Task created successfully!");
        navigate("/task-manager");
      } catch (error) {
        console.error("Error Creating Task:", error);
      }
    } else {
      console.log("Missing fields!");
    }
  };
  return (
    <div>
      <TopBar />
      <form className="flex flex-col px-5 gap-y-6">
        <div className="flex flex-col">
          <div className=" flex items-center gap-x-3">
            <ToggleSwitch checked={isPrivate} onChange={setIsPrivate} />
            <h2 className="text-lg font-semibold">Private Task</h2>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" flex items-center gap-x-3">
            <ToggleSwitch checked={automatic} onChange={setAutomatic} />
            <h2 className="text-lg font-semibold">Automatic Attribution</h2>
          </div>
          <p className="text-black60 text-base mt-2">
            This task is automatically attributed to different members.
          </p>
        </div>
        <Input label="Title" value={title} onChange={setTitle} />
        <InputDropdown
          label={"Repeat"}
          value={repeat}
          onChange={setRepeat}
          options={[
            "Never",
            "Every Week",
            "Every 2 Weeks",
            "Every Month",
            "Every Year",
          ]}
        />
        <Input label="Details" value={details} onChange={setDetails} />
        <CategoriesInput
          label={"Category"}
          categorySelected={category}
          onChange={setCategory}
        />
        <Button
          label="Create Task"
          type="submit"
          className="btn btn-primary"
          action={handleTaskCreation}
        />
      </form>
      <BottomBar />
    </div>
  );
};
export default NewTask;
