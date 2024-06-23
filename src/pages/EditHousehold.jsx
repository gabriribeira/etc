import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import CategoriesInput from "../components/common/CategoriesInput";
import ImageUpload from "../components/common/ImageUpload";
import { useGetHouseholdQuery, useUpdateHouseholdMutation, useGetHouseholdTagsQuery, useUpdateHouseholdTagsMutation } from "../app/api";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

const EditHouseHold = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);
  const householdId = useSelector((state) => state.auth.currentHouseholdId);

  const { data: household, isLoading: isHouseholdLoading } = useGetHouseholdQuery(householdId, {
    skip: !householdId,
  });

  const { data: householdTags, isLoading: isTagsLoading } = useGetHouseholdTagsQuery(householdId, {
    skip: !householdId,
  });

  const [updateHousehold] = useUpdateHouseholdMutation();
  const [updateHouseholdTags] = useUpdateHouseholdTagsMutation();

  useEffect(() => {
    if (household) {
      console.log("Household data:", household.data);
      setName(household.data.name || "");
      setDescription(household.data.description || "");
    }
  }, [household]);

  useEffect(() => {
    if (householdTags) {
      console.log("Household tags:", householdTags.data);
      setTags(householdTags.data.map(tag => tag.id));
    }
  }, [householdTags]);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await updateHousehold({ id: householdId, formData }).unwrap();
      await updateHouseholdTags({ householdId, tags }).unwrap();
      alert("Household updated successfully");
    } catch (error) {
      console.error("Failed to update household:", error);
      alert("Failed to update household");
    }
  };

  if (isHouseholdLoading || isTagsLoading) return <Loader />;

  return (
    household && (
      <div>
        <TopBar />
        <main className="mt-32 bg-white">
          <div className="flex flex-col">
            <div className="flex flex-col text-center relative justify-center m-4 items-center">
              {household.data.img_url ? (
                <img
                  src={household.data.img_url}
                  alt="Household Profile Picture"
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <ImageUpload onImageUpload={setImageFile} />
              )}
            </div>
            <div className="p-4 flex flex-col gap-y-4">
              <Input
                label="Household Name"
                value={name}
                onChange={(value) => {
                  console.log("Household Name Change:", value);
                  setName(value);
                }}
              />
              <Input
                label="Description"
                value={description}
                onChange={(value) => {
                  console.log("Description Change:", value);
                  setDescription(value);
                }}
              />
              <CategoriesInput
                label="Tags"
                onChange={setTags}
                categorySelected={tags}
                specificationsProps={false}
                categoriesProps={false}
              />
              <Button label="Save Changes" action={handleSaveChanges} aria="Button Save Changes" />
            </div>
          </div>
        </main>
        <BottomBar />
      </div>
    )
  );
};

export default EditHouseHold;