import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchInput from "../components/common/SearchInput";
import { useSearchUsersQuery } from "../app/api";

const AddMembers = ({ authHousehold, members, setMembers }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  //eslint-disable-next-line
  const { data: users, refetch } = useSearchUsersQuery(search, {
    skip: !search,
  });

  useEffect(() => {
    if (users) {
      setResults(users);
    }
  }, [users]);

  const handleSelect = (user) => {
    console.log(user);
    if (!members.some((member) => member.id === user.id)) {
      setMembers([...members, user]);
    }
    setSearch(""); // Clear search input after selecting a user
  };

  return (
    authHousehold && (
      <div className="flex flex-col w-full pt-5">
        <div className="rounded-2xl flex items-center gap-x-3">
          <img
            src={authHousehold.img_url}
            alt="Authenticated User Profile Picture"
            className="w-[60px] h-[60px] rounded-full object-cover object-center left-0 top-0"
          />
          <h1 className="text-xl font-semibold text-black">
            {authHousehold.name}
          </h1>
        </div>
        <div className="w-full">
          <SearchInput
            label="Search for other users"
            value={search}
            onChange={setSearch}
            results={results.data}
            onSelect={handleSelect}
          />
        </div>
        <div className="rounded-2xl bg-black10 p-6 mt-6 grid grid-cols-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-3 items-center col-span-1"
            >
              <img
                src={member.img_url}
                alt="Authenticated User Profile Picture"
                className="w-[50px] h-[50px] rounded-full object-cover object-center left-0 top-0"
              />
              <h2 className="font-medium text-base">
                {member.name.split(" ")[0]}
              </h2>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

AddMembers.propTypes = {
  authUser: PropTypes.object.isRequired,
  authHousehold: PropTypes.object.isRequired,
  members: PropTypes.array,
  setMembers: PropTypes.func.isRequired,
};

export default AddMembers;
