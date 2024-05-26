import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import UsersData from "../../data/users.json";
import { GoPencil } from "react-icons/go";
import Button from "./Button";

const MembersInput = ({ value, onChange, label }) => {
  const usersData = UsersData;
  const [openOverlay, setOpenOverlay] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (usersData) {
      const filteredUsers = usersData.filter(user => user.households.includes(1));
      setUsers(filteredUsers);
    }
  }, [usersData]);

  useEffect(() => {
    if (value) {
      setSelectedUsers(value);
    }
  }, [value]);

  let type;
  if (location.pathname === "/lists/new") {
    type = "list";
  } else if (location.pathname.match(/\/lists\/\d+\/item/)) {
    type = "product";
  } else {
    type = "expense";
  }

  return (
    <>
      {openOverlay && (
        <div className="fixed mt-28 w-screen h-[100vh] bg-white top-0 left-0 z-10">
          <div className="flex flex-col px-5 py-3 gap-y-6">
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">Members</h1>
              <p className="text-sm text-black50">
                Assign the members taking part of this {type}.
              </p>
            </div>
            <div className="grid gap-3">
              {users &&
                users.map((user, index) => (
                  <button
                    key={index}
                    className={`transition-all duration-300 h-[3rem] rounded-2xl flex items-center justify-start col-span-1 relative ${
                      selectedUsers.includes(user.id) ? "bg-black20 text-black" : "bg-black90 text-white opacity-60"
                    }`}
                    onClick={() => {
                      if (selectedUsers.includes(user.id)) {
                        setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                      } else {
                        setSelectedUsers([...selectedUsers, user.id]);
                      }
                    }}
                    type="button"
                  >
                    <div className="w-[35px] h-[35px] rounded-full flex items-center shrink-0 relative">
                      <img
                        src={require(`../../assets/data/users/${user.img}`)}
                        alt="User Profile Picture"
                        className="w-full h-full rounded-full object-cover object-center ml-2 absolute "
                      />
                    </div>
                    <p
                      className={`transition-all duration-300 text-base font-semibold ml-3 ${
                        selectedUsers.includes(user.id) ? "text-black" : "text-white"
                      }`}
                    >
                      {user.name.split(' ')[0]} {user.name.split(' ')[1][0]}.
                    </p>
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
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-start w-full bg-black20 rounded-xl py-2 items-center pl-2">
          <button
            onClick={() => setOpenOverlay(true)}
            className="w-[35px] h-[35px] rounded-full bg-black text-xl flex items-center justify-center"
            type="button"
            aria-label="Edit Members"
          >
            <GoPencil color="white" />
          </button>
          <h1 className="font-semibold text-lg ml-2">{label ? label : "Active"}</h1>
        </div>

        {selectedUsers.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 w-full bg-black20 rounded-xl py-2 pl-2 mt-0">
            {users &&
              users.map(
                (user, index) =>
                  value.includes(user.id) && (
                    <div
                      key={index}
                      className="w-[35px] h-[35px] rounded-full flex items-center shrink-0 relative"
                    >
                      <img
                        src={require(`../../assets/data/users/${user.img}`)}
                        alt="User Profile Picture"
                        className="w-full h-full rounded-full object-cover object-center absolute top-0 left-0"
                      />
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </>
  );
};

MembersInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default MembersInput;
