import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";
import { GoPencil } from "react-icons/go";
import TopBar from "./TopBar";
import Button from "./Button";

//eslint-disable-next-line
const MembersInput = ({ value, onChange, label }) => {
  const usersData = UsersData;
  const [openOverlay, setOpenOverlay] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    if (usersData) {
      usersData.map((user) => {
        if (user.households.includes(1)) {
          setUsers([...users, user]);
        }
      });
      setUsers(usersData);
    }
  }, [usersData]);
  useEffect(() => {
    if (value) {
      setSelectedUsers(value);
    }
  }, [value]);
  return (
    <>
      {openOverlay && (
        <div className="fixed w-screen h-[100vh] bg-white top-0 left-0 z-10">
          <TopBar />
          <div className="flex flex-col px-5 py-3 gap-y-6">
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">Members</h1>
              <p className="text-base text-black50">
                Assign the members taking part of this product.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {users &&
                users.map((user, index) => (
                  <button
                    key={index}
                    className={`transition-all duration-300 h-[10rem] rounded-2xl flex items-center justify-center col-span-1 relative`}
                    onClick={() => {
                      if (selectedUsers.includes(user.id)) {
                        setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                      } else {
                        setSelectedUsers([...selectedUsers, user.id]);
                      }
                    }}
                    type="button"
                  >
                    <img
                      //eslint-disable-next-line
                      src={require(`../../assets/data/users/${user.img}`)}
                      alt="User Profile Picture"
                      className={`transition-all duration-300 w-full h-full object-cover object-center rounded-2xl bg-black ${
                        !selectedUsers.includes(user.id) && "opacity-50"
                      }`}
                    />
                    <h1
                      className={`transition-all duration-300 text-base font-normal absolute bottom-1 left-1 rounded-full py-1 px-2 ${
                        !selectedUsers.includes(user.id)
                          ? "bg-white/80 text-black"
                          : "text-white bg-black/60"
                      }`}
                    >
                      {user.name}
                    </h1>
                  </button>
                ))}
            </div>
            <div className="flex flex-col">
              <p>Dividing by</p>
              <p className="text-xl font-semibold">{selectedUsers.length} Members</p>
            </div>
            <Button label="Add Members" action={() => {onChange(selectedUsers); setOpenOverlay(false)}} />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">{label ? label : "Active"}</h1>
        <div className="flex items-center gap-x-3">
          {users &&
            users.map(
              (user, index) =>
                value.includes(user.id) && (
                  <div
                    key={index}
                    className="w-[35px] h-[35px] rounded-full flex items-center shrink-0 relative"
                  >
                    <img
                      //eslint-disable-next-line
                      src={require(`../../assets/data/users/${user.img}`)}
                      alt="User Profile Picture"
                      className="w-full h-full rounded-full object-cover object-center absolute top-0 left-0"
                    />
                  </div>
                )
            )}
          <button
            onClick={() => setOpenOverlay(true)}
            className="w-[35px] h-[35px] rounded-full border-2 border-black text-xl flex items-center justify-center"
            type="button"
          >
            <GoPencil />
          </button>
        </div>
      </div>
    </>
  );
};

MembersInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default MembersInput;
