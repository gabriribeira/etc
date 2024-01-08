import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";
import HouseholdData from "../data/households.json";
import UserData from "../data/users.json";

const JoinHousehold = () => {
  const data = HouseholdData;
  const userData = UserData;
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [household, setHousehold] = useState(null);
  const [members, setMembers] = useState(null);
  //eslint-disable-next-line
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (search && search !== "") {
      const results = data.filter((household) =>
        household.name.toLowerCase().includes(search.toLowerCase())
      );
      if (
        results &&
        results != [] &&
        results != null &&
        results != undefined &&
        results != ""
      ) {
        setResults(results);
      } else {
        setResults(null);
      }
    } else {
      setResults(null);
    }
  }, [search]);

  useEffect(() => {
    if (household) {
      const membersAux = userData.filter((user) =>
        user.households.includes(household.id)
      );
      setMembers(membersAux);
    }
  }, [household]);

  const handleJoinHousehold = () => {
    console.log("Request Sent");
    setRequestSent(true);
  };

  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex flex-col px-5 gap-y-6">
        <SearchInput
          label="Search for Household Name"
          value={search}
          onChange={setSearch}
          search="households"
          results={results}
          onSelect={setHousehold}
        />
        {household &&
          (!requestSent ? (
            <div className="flex flex-col gap-y-10 mt-6">
              <div className="flex flex-col gap-y-3">
                <img
                  //eslint-disable-next-line
                  src={require(`../assets/data/households/${household.img}`)}
                  alt="Household"
                  className="w-[150px] h-[150px] rounded-full m-auto"
                />
                <h1 className="text-2xl m-auto">{household.name}</h1>
              </div>
              <div className="flex flex-col">
                <h2 className="text-base">Description</h2>
                <p className="text-base">{household.description}</p>
              </div>
              <div className="flex flex-col">
                <h2 className="text-base">Members</h2>
                <div className="flex items-center gap-x-2">
                  {members &&
                    members.map((member, index) => (
                      <img
                        key={index}
                        //eslint-disable-next-line
                        src={require(`../assets/data/users/${member.img}`)}
                        alt="Household"
                        className="w-[35px] h-[35px] rounded-full object-center object-cover"
                      />
                    ))}
                </div>
              </div>
              <Button label="Join Household" action={handleJoinHousehold} />
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 mt-6 h-full">
              <div className="flex flex-col gap-y-5">
                <img
                  //eslint-disable-next-line
                  src={require(`../assets/data/households/${household.img}`)}
                  alt="Household"
                  className="w-[150px] h-[150px] rounded-full m-auto"
                />
                <h1 className="text-2xl m-auto">{household.name}</h1>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-5">
                <p className="text-lg">Waiting for approval</p>
                <p className="text-black50 w-[90%] text-center">
                  While you are waiting for approval you can always create your
                  own household. Once your request has been accepted, you can
                  start interacting with your new household.
                </p>
              </div>
              <Button to="/" label="Go to Homepage" action={handleJoinHousehold} />
              <Button
                label="Create your own Household"
                action={handleJoinHousehold}
                stroke={true}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default JoinHousehold;
