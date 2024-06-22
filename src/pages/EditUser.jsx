import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import CategoriesInput from "../components/common/CategoriesInput";
import Button from "../components/common/Button";
import { useGetUserQuery, useUpdateUserMutation, useAddUserSpecificationsMutation, useGetUserSpecificationsQuery } from "../app/api";
import { useSelector } from "react-redux";
import ImageUpload from "../components/common/ImageUpload";
import { updateUserState } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();

  const { data: user, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const { data: userSpecifications, isLoading: isSpecificationsLoading } = useGetUserSpecificationsQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setUsername(user.data.username);
      setDescription(user.data.description);
    }
  }, [user]);

  useEffect(() => {
    if (userSpecifications) {
      setSpecifications(userSpecifications.data.map(spec => spec.id));
    }
  }, [userSpecifications]);

  const [updateUser] = useUpdateUserMutation();
  const [addUserSpecifications] = useAddUserSpecificationsMutation();

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      // Send user update request
      const response = await updateUser({ id: user.data.id, formData }).unwrap();
  
      // Send user specifications update request
      await addUserSpecifications({ userId: user.data.id, specifications }).unwrap();
  
      dispatch(updateUserState(response.data));
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user");
    }
  };

  if (isLoading || isSpecificationsLoading) return <div>Loading...</div>;

  return (
    user && (
      <div>
        <TopBar />
        <main className="mt-32 bg-white">
          <div className="flex flex-col">
            <div className="flex flex-col text-center relative justify-center m-4 items-center">
              {user.data.img_url ?
                <img
                  src={user.data.img_url}
                  alt="User Profile Picture"
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                :
                <ImageUpload onImageUpload={setImageFile} />
              }
            </div>
            <div className="p-4 flex flex-col gap-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e)}
              />
              <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e)}
              />
              <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e)}
              />
              <CategoriesInput
                label="Food Restrictions"
                onChange={setSpecifications}
                categorySelected={specifications}
                specificationsProps={true}
              />
              <Button
                label="Save Changes"
                action={handleSaveChanges}
                aria="Button Save Changes"
              />
            </div>
          </div>
        </main>
        <BottomBar />
      </div>
    )
  );
};

export default EditUser;