import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import CategoriesInput from "../components/common/CategoriesInput";
import Button from "../components/common/Button";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useAddUserSpecificationsMutation,
  useGetUserSpecificationsQuery,
} from "../app/api";
import { useSelector } from "react-redux";
import ImageUpload from "../components/common/ImageUpload";
import { updateUserState } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { useNavigationType } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const { data: user, isLoading, refetch } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const { data: userSpecifications, isLoading: isSpecificationsLoading, refetch: refetchUserSpecifications } = useGetUserSpecificationsQuery(userId, {
    skip: !userId,
  });

  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      refetch();
      refetchUserSpecifications();
    }
  }, [navigationType, refetch, refetchUserSpecifications]);

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setUsername(user.data.username ? user.data.username : "");
      setDescription(user.data.description ? user.data.description : "");
    }
  }, [user]);

  useEffect(() => {
    if (userSpecifications) {
      setSpecifications(userSpecifications.data.map((spec) => spec.id));
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
      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigate("/profile", { state: { message: "User Updated" } });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  if (isLoading || isSpecificationsLoading) return <Loader />;

  return (
    user && (
      <div>
        <TopBar />
        <main className="mt-32 bg-white">
          <div className="flex flex-col">
            <div className="flex flex-col text-center relative justify-center m-4 items-center">
              {image ?
                <img
                  src={image}
                  alt="User Profile Picture"
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                :
                user.data.img_url ? (
                  <>

                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="file"
                      className="z-[102] w-[150px] h-[150px] m-auto shadow-2xl rounded-full text-5xl flex justify-center items-center cursor-pointer relative my-6 shrink-0"
                    >
                      <img
                        src={user.data.img_url}
                        alt="User Profile Picture"
                        className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </label>
                  </>
                ) : (
                  <ImageUpload onImageUpload={setImageFile} />
                )}
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
        {showConfirmation && (
          <ConfirmationDialog
            title="Confirm Update"
            details="Are you sure you want to update this user?"
            label="Ok"
            bg="bg-black"
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            action={handleCloseConfirmation}
          />
        )}
      </div>
    )
  );
};

export default EditUser;
