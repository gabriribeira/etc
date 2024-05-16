import React, { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import ImageUpload from "../components/common/ImageUpload";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import HouseholdsData from "../data/households.json";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BottomBar from "../components/common/BottomBar";

const NewHousehold = () => {
  const households = HouseholdsData;
  const navigate = useNavigate();
  const [householdName, setHouseholdName] = useState("");
  const [description, setDescription] = useState("");
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };

    const storedUser = getCookieValue("user");
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);
  const handleNewHousehold = () => {
    const newHousehold = {
      id: households.length + 1,
      name: householdName,
      img: "",
      description: description,
      tags: [],
      admins: [authUser.id],
    };
    households.push(newHousehold);
    Cookies.set("household", JSON.stringify(newHousehold), { path: "/" });
    navigate("/add-members");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="pt-32">
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
            placeholder="Description"
          />
        </div>
        <div className="h-full my-6">
          <Button label="Submit" action={handleNewHousehold} />
        </div>
      </form>
      </main>
      <BottomBar />
    </div>
  );
};
export default NewHousehold;
