import React, { useState } from "react";
import TopBar from "../components/common/TopBar";
import ImageUpload from "../components/common/ImageUpload";
import Input from "../components/common/Input";
import AddMembers from "../components/common/AddMembers";
import Button from "../components/common/Button";

const NewHousehold = () => {
  const [householdName, setHouseholdName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
        <div className="flex flex-col w-full gap-y-6 h-auto">
          <div className="my-4">
            <ImageUpload />
          </div>
          <Input
            label="Household Name"
            value={householdName}
            onChange={setHouseholdName}
          />
          <Input
            label="Description"
            value={description}
            onChange={setDescription}
          />
          <AddMembers />
        </div>
        <div className="h-full my-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};
export default NewHousehold;
