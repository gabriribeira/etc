import React, { useState } from "react";
import TopBar from "../components/common/TopBar";
import ImageUpload from "../components/common/ImageUpload";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import BottomBar from "../components/common/BottomBar";
import ProgressBar from "../components/common/ProgressBar";
import { useCreateHouseholdMutation, useCreateRequestMutation, useUpdateHouseholdTagsMutation, useGetGoalsByTagsQuery, useAssignGoalsToHouseholdMutation } from "../app/api";
import { useSelector } from "react-redux";
import AddMembers from "./AddMembers";
import CategoriesInput from "../components/common/CategoriesInput";
import { useNavigate } from "react-router-dom";

const NewHousehold = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [household, setHousehold] = useState(null);
  const [householdName, setHouseholdName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [createHousehold, { isLoading, isError }] = useCreateHouseholdMutation();
  const [members, setMembers] = useState([]);
  const [createRequest] = useCreateRequestMutation();
  const [addHouseholdTags] = useUpdateHouseholdTagsMutation();
  const [tags, setTags] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const { data: fetchedGoals } = useGetGoalsByTagsQuery(tags, { skip: tags.length === 0 });
  const [assignGoals] = useAssignGoalsToHouseholdMutation();

  const toggleGoal = (goal) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleNewHousehold = async () => {
    try {
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }
      const formData = new FormData();
      formData.append("name", householdName);
      formData.append("description", description);
      formData.append("privacy", false);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      let householdResponse = await createHousehold(formData).unwrap();
      setHousehold(householdResponse);
      setStep(2);
    } catch (error) {
      console.error("Failed to update household:", error);
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
      setStep(4);
    } catch (error) {
      console.error("Error adding tags:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await assignGoals({ householdId: household.id, goalIds: selectedGoals.map((goal) => goal.id) }).unwrap();
      navigate("/household");
    } catch (error) {
      console.error('Failed to assign goal:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      {step === 1 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <div className="flex flex-col gap-y-3 pb-5">
              <h2 className="text-lg font-semibold text-black">
                Create a Household
              </h2>
              <p className="text-base text-black50 font-medium">
                Start by inserting some basic information about your household.
              </p>
            </div>
            <ProgressBar progress={1} />
            <div className="flex flex-col w-full gap-y-6 h-auto">
              <div className="my-4">
                <ImageUpload onImageUpload={setImageFile} />
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
            <div className="flex flex-col gap-y-3">
              <h2 className="text-lg font-semibold text-black">
                Invite Members
              </h2>
              <p className="text-base text-black50 font-medium">
                Invite some members to join your household.
              </p>
            </div>
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
            <div className="flex flex-col gap-y-2 pb-5">
              <h2 className="text-lg font-semibold text-black">
                Sustainable Tags
              </h2>
              <p className="text-base text-black50 font-medium">
                Select some tags that you want to define your household in terms of sustainable practices.
              </p>
            </div>
            <ProgressBar progress={7} />
            <div className="flex flex-col w-full gap-y-6 h-auto pt-5">
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
      {step === 4 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <div className="flex flex-col gap-y-2 mb-5">
              <h2 className="text-lg font-semibold text-black">
                Sustainable Goals
              </h2>
              <p className="text-base text-black50 font-medium">
                Select a goals that you want to achieve as a household in terms of sustainable practices.
              </p>
            </div>
            <ProgressBar progress={9} />
            <div className="flex flex-col w-full gap-y-6 h-auto mt-5">
              {fetchedGoals && fetchedGoals.data &&
                fetchedGoals.data.map((goal, slide, index) => (
                  <button
                    key={index}
                    className={`flex flex-col rounded-2xl border-2 border-green p-5 text-left gap-y-3 m-y-2 ${selectedGoals.includes(goal)
                      ? "bg-green text-white"
                      : "text-green"
                      }`}
                    onClick={() => toggleGoal(goal)}
                    type="button"
                  >
                    <p>{goal.amount} times in 1 month</p>
                    <div className="flex flex-col">
                      <h2 className="text-xs font-normal text-black">{goal.slug}</h2>
                      <h1 className="font-semibold text-2xl text-black">
                        {goal.title}
                      </h1>
                      <p className="font-normal text-sm text-black">{goal.details}</p>
                    </div>
                  </button>
                ))}
            </div>
          </form>
          <div className="h-full my-6 px-5">
            <Button
              label="Next"
              action={handleSubmit}
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