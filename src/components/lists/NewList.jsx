import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import AiStarsImg from "../../assets/imgs/etc/ai-stars.svg";
import ToggleSwitch from "../common/ToggleSwitch";
import Button from "../common/Button";
import MembersInput from "../common/MembersInput";
import TopBar from "../common/TopBar";
import BottomBar from "../common/BottomBar";
import {
  useCreateListMutation,
  useCreateListFromRecipeMutation,
  useCreateListFromEventMutation,
} from "../../app/api";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

const NewList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const initialAiToggle =
    location.state && location.state.aiToggle ? location.state.aiToggle : false;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [aiToggle, setAiToggle] = useState(initialAiToggle);
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [eventSelected, setEventSelected] = useState(false);
  const [members, setMembers] = useState([]);

  const [createList, { isLoading: isLoadingCreate }] = useCreateListMutation();
  const [createListFromRecipe, { isLoading: isLoadingRecipe }] =
    useCreateListFromRecipeMutation();
  const [createListFromEvent, { isLoading: isLoadingEvent }] =
    useCreateListFromEventMutation();

  const handleRecipeButton = () => {
    setEventSelected(false);
    setRecipeSelected(true);
    setDescription("");
  };

  const handleEventButton = () => {
    setEventSelected(true);
    setRecipeSelected(false);
    setDescription("");
  };

  const handleNewList = async () => {
    try {
      const newListData = {
        name: name,
        description: description,
        user_id: user.id,
      };

      if (aiToggle) {
        if (recipeSelected) {
          await createListFromRecipe(newListData).unwrap();
        } else if (eventSelected) {
          await createListFromEvent(newListData).unwrap();
        }
      } else {
        await createList(newListData).unwrap();
      }

      navigate("/lists");
    } catch (error) {
      console.error("Error creating list:", error);
      // Logic to handle errors when creating the list
    }
  };

  useEffect(() => {
    setRecipeSelected(false);
    setEventSelected(false);
    setDescription("");
  }, [aiToggle]);

  return (
    <div className="bg-white min-h-screen">
      <TopBar />
      {isLoadingRecipe  && <Loader />}
      <main className="pt-32">
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col w-full gap-y-3">
            <form>
              <Input
                label="Name"
                value={name}
                onChange={setName}
                placeholder="List Name"
              />
              <br />

              {!aiToggle && (
                <>
                  <Input
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    placeholder="Eg: Secret Santa Dinner Shopping"
                  />
                </>
              )}
              <br />
              <MembersInput
                label="Edit Members"
                value={members}
                onChange={setMembers}
              />
              <div className="mt-6 flex flex-row justify-between align-middle items-center">
                <div className="flex align-middle items-center">
                  <img src={AiStarsImg} alt="AI Stars" />
                  <p className="ms-4 font-bold ai-linear-text-gradient">
                    Generate List With AI
                  </p>
                </div>
                <ToggleSwitch
                  checked={aiToggle}
                  onChange={() => setAiToggle(!aiToggle)}
                />
              </div>

              {aiToggle && (
                <div className="flex flex-col">
                  <h4 className="text-[16px] my-2">
                    An easier and faster way to create a shopping list.{" "}
                    <strong className="inline ai-linear-text-gradient">
                      Powered
                    </strong>{" "}
                    by et.cetera&apos;s AI
                  </h4>
                  <p className="text-[14px]">
                    You can ask AI to generate the ingredients of a recipe or to
                    help you out with the shopping list for your next event!
                  </p>
                  <br />
                  <Button
                    label="Recipe"
                    stroke={true}
                    action={handleRecipeButton}
                    customBorder={recipeSelected ? "ai-border-gradient" : ""}
                  />
                  <br />
                  <Button
                    label="Event"
                    stroke={true}
                    action={handleEventButton}
                    customBorder={eventSelected ? "ai-border-gradient" : ""}
                  />
                  <br />
                  {recipeSelected && (
                    <>
                      <p className="text-[16px]">
                        What recipe do you want to generate?
                      </p>
                      <p className="text-[14px] my-2">
                        Your recipe can be found in the list&apos;s description.
                      </p>
                    </>
                  )}
                  {eventSelected && (
                    <>
                      <p className="text-[16px]">
                        What event do you need help with?
                      </p>
                      <p className="text-[14px] my-2">
                        I will help you create a list for the event you need.
                      </p>
                    </>
                  )}
                  {(recipeSelected || eventSelected) && (
                    <Input
                      label=""
                      value={description}
                      onChange={setDescription}
                      placeholder={`${
                        eventSelected
                          ? "Eg: Birthday dinner for 5 friends, picnic date"
                          : "Eg: Vegetarian Lasagna, Gluten Free"
                      }`}
                    />
                  )}
                </div>
              )}
              <div className="my-6">
                <Button
                  label="Done"
                  action={handleNewList}
                  turnDisabled={!name || (name && aiToggle && !description)}
                  isLoading={
                    isLoadingCreate || isLoadingRecipe || isLoadingEvent
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default NewList;
