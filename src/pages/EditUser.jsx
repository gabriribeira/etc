import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import CategoriesInput from "../components/common/CategoriesInput";
import Button from "../components/common/Button";

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);

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
      setUser(storedUser);
      setName(storedUser.name);
      setUsername(storedUser.username);
      setDescription(storedUser.description);
      setCategory(storedUser.food_restriction || []); 
    }
  }, []);

  const handleSaveChanges = () => {
    console.log({
      name,
      username,
      description,
      category,
    });
  };

  return (
    user && (
      <div>
        <TopBar />
        <main className="mt-32">
          <div className="flex flex-col">
            <div className="flex flex-col text-center relative justify-center m-4 items-center">
              <img
                // eslint-disable-next-line
                src={require(`../assets/data/users/${user.img}`)}
                alt="User Profile Picture"
                className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
              />
            </div>
            <div className="p-4 flex flex-col gap-y-4">
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <CategoriesInput
                label="Food Restrictions"
                onChange={setCategory}
                value={category}
                categorySelected={category}
                type="food"
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

export default EditUser;
