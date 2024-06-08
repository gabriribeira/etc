import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const EditHouseHold = () => {
  const [household, setHousehold] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

    const storedHousehold = getCookieValue("household");
    if (storedHousehold) {
      setHousehold(storedHousehold);
      setName(storedHousehold.name);
      setDescription(storedHousehold.description);
    }
  }, []);

  const handleSaveChanges = () => {
    console.log({
      name,
      description,
    });
  };

  return (
    household && (
      <div>
        <TopBar />
        <main className="mt-32 bg-white">
          <div className="flex flex-col">
            <div className="flex flex-col text-center relative justify-center m-4 items-center">
              <img
                // eslint-disable-next-line
                src={require(`../assets/data/households/${household.img}`)}
                alt="Household Profile Picture"
                className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
              />
            </div>
            <div className="p-4 flex flex-col gap-y-4">
              <Input label="Household Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              
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
