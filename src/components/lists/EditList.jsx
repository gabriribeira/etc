import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import MembersInput from "../common/MembersInput";
import TopBar from "../common/TopBar";
import BottomBar from "../common/BottomBar";
import { useGetListQuery, useUpdateListMutation } from "../../app/api";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

const EditList = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const pathname = window.location.pathname;
  const listId = pathname.split("/").pop(); // Extract listId from URL

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);

  const { data: list, isLoading: isLoadingList } = useGetListQuery(listId);
  const [updateList] = useUpdateListMutation();

  // Log listId to verify it is correctly captured
  console.log("List ID from URL:", listId);

  useEffect(() => {
    if (list) {
      setName(list.name);
      setDescription(list.description);
      setMembers(list.userIds || []);
    }
  }, [list]);

  const handleUpdateList = async () => {
    try {
      const updatedListData = {
        id: listId,
        name: name,
        description: description,
        user_id: user.id,
        userIds: members,
      };

      console.log("Updating List with ID:", listId);
      console.log("Updated List Data:", updatedListData);

      await updateList(updatedListData).unwrap();
      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error("Error updating list:", error);
      if (error.data) {
        console.error("Error details:", error.data);
      }
      // Additional error handling logic can be added here
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <TopBar listTitle="Edit List" />
      {isLoadingList && <Loader />}
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
              <Input
                label="Description"
                value={description}
                onChange={setDescription}
                placeholder="Eg: Secret Santa Dinner Shopping"
              />
              <br />
              <MembersInput
                label="Edit Members"
                value={members}
                onChange={setMembers}
              />
              <div className="my-6">
                <Button
                  label="Update List"
                  action={handleUpdateList}
                  turnDisabled={!name}
                  
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

export default EditList;
