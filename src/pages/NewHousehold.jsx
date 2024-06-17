import React, { useState } from "react";
import TopBar from "../components/common/TopBar";
import ImageUpload from "../components/common/ImageUpload";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import BottomBar from "../components/common/BottomBar";
import ProgressBar from "../components/common/ProgressBar";
import { useCreateHouseholdMutation, useCreateRequestMutation, useAddHouseholdTagsMutation } from "../app/api";
import { useSelector } from "react-redux";
import AddMembers from "./AddMembers";
import CategoriesInput from "../components/common/CategoriesInput";
import { useNavigate } from "react-router-dom";

const NewHousehold = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [household, setHousehold] = useState(null);
  const [householdName, setHouseholdName] = useState("");
  const [description, setDescription] = useState("");
  const [createHousehold, { isLoading, isError }] = useCreateHouseholdMutation();
  const [members, setMembers] = useState([]);
  const [createRequest] = useCreateRequestMutation();
  const [addHouseholdTags] = useAddHouseholdTagsMutation();
  const [tags, setTags] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const handleNewHousehold = async () => {
    if (!user) {
      console.error("No authenticated user found.");
      return;
    }

    const newHousehold = {
      name: householdName,
      description: description,
      privacy: false,
    };

    try {
      let householdResponse = await createHousehold(newHousehold).unwrap();
      setHousehold(householdResponse);
      setStep(2);
    } catch (error) {
      console.error("Error creating household:", error);
    }
  };

  const handleInviteMembers = async () => {
    try {
      await Promise.all(
        members.map((userId) =>
          createRequest({
            householdId: household.id,
            userId: userId.id,
            type: "invite",
          }).unwrap()
        )
      );
      setStep(3);
    } catch (error) {
      console.error("Error inviting members:", error);
    }
  };

  const handleTags = async () => {
    try {
      await addHouseholdTags({ householdId: household.id, tags }).unwrap();
      navigate("/household")
    } catch (error) {
      console.error("Error adding tags:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      {step === 1 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <ProgressBar progress={1} />
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
                placeholder="Description"
              />
            </div>
            <div className="h-full my-6">
              <Button
                label="Next"
                action={handleNewHousehold}
                isLoading={isLoading}
              />
              {isError && (
                <p className="text-red-500">
                  Error creating household. Please try again.
                </p>
              )}
            </div>
          </form>
        </main>
      )}
      {step === 2 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <ProgressBar progress={5} />
            <div className="flex flex-col w-full gap-y-6 h-auto">
              <AddMembers
                authUser={user}
                authHousehold={household}
                members={members}
                setMembers={setMembers}
              />
            </div>
          </form>
          <div className="h-full my-6 px-5">
            <Button
              label="Next"
              action={handleInviteMembers}
              isLoading={isLoading}
            />
          </div>
        </main>
      )}
      {step === 3 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <ProgressBar progress={9} />
            <div className="flex flex-col w-full gap-y-6 h-auto">
              <CategoriesInput label={"Sustainable Tags"} categorySelected={tags} onChange={setTags} filter={false} />
            </div>
          </form>
          <div className="h-full my-6 px-5">
            <Button
              label="Next"
              action={handleTags}
              isLoading={isLoading}
            />
          </div>
        </main>
      )}
      <BottomBar />
    </div>
  );
};

export default NewHousehold;