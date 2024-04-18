import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import MembersInput from "../components/common/MembersInput";
import UsersData from "../data/users.json";
import {BsStars} from "react-icons/bs";
import ToggleSwitch from "../components/common/ToggleSwitch";

const NewList = () => {
  const usersData = UsersData;
  const [title, setTitle] = useState("");
  //eslint-disable-next-line
  const [paidBy, setPaidBy] = useState("");
  const [members, setMembers] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [colorButton, setColorButton] = useState("bg-black40 text-black");

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
      setPaidBy(storedUser.id);
      
    
    }
  }, []);
  useEffect(() => {
    if (usersData) {
      setMembers(
        usersData
          .filter((user) => user.households.includes(1))
          .map((user) => user.id)
      );
    }
  }, [usersData]);

  const handleChange = (isChecked) => {
    console.log("Switch state changed to:", isChecked);
    setColorButton(isChecked ? "bg-gradient-to-r from-blue to-salmon text-white" : "bg-black40 text-black");
  };  
  

  return (
    authUser && (
      <div className="bg-white">

        <TopBar />

        <main>
          <form className="flex flex-col px-5 gap-y-6">
            <Input label="Name" placeholder="List Name" value={title} onChange={setTitle}  />
            <MembersInput
              value={members}
              onChange={setMembers}
              label={"Members"}
            />

          <div className="relative inline-flex items-center">
            <BsStars className="inline-block align-middle mr-2" color="blue" size={30} />
            <div className="bg-gradient-to-r from-blue to-salmon text-transparent bg-clip-text inline-block">
              <p className="inline-block align-middle"><strong>Generate List With AI</strong></p>
            </div>
            <div className="ml-auto inline-block align-middle">
            <ToggleSwitch checked={false} onChange={handleChange} />
            </div>
          </div>


            
            <Button
              label="Done"
              to="/lists/new"
              bg={colorButton}
            />
          </form>
        </main>

        <BottomBar />
        
      </div>
    )
  );
};
export default NewList;
