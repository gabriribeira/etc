import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";
import { useSearchHouseholdsQuery, useCreateRequestMutation } from "../app/api";
import { useSelector } from "react-redux";

const JoinHousehold = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [household, setHousehold] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const { data: searchResults } = useSearchHouseholdsQuery(search, {
    skip: !search,
  });
  const [createJoinRequest, { isLoading }] = useCreateRequestMutation();

  useEffect(() => {
    if (searchResults) {
      setResults(searchResults);
    }
  }, [searchResults]);

  const handleJoinHousehold = async () => {
    try {
      await createJoinRequest({ householdId: household.id, userId: user.id, type: "join", }).unwrap();
      setRequestSent(true);
    } catch (error) {
      console.error("Error sending join request:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="flex flex-col px-5 gap-y-6 pt-32">
        <SearchInput
          label="Search for Household Name"
          value={search}
          onChange={setSearch}
          results={results}
          onSelect={setHousehold}
        />
        {household &&
          (!requestSent ? (
            <div className="flex flex-col gap-y-10 mt-6">
              <div className="flex flex-col gap-y-3">
                <img
                  src={household.img_url} // Update this line to use the proper image URL field
                  alt="Household"
                  className="w-[150px] h-[150px] rounded-full m-auto"
                />
                <h1 className="text-2xl m-auto">{household.name}</h1>
              </div>
              <div className="flex flex-col">
                <h2 className="text-base">Description</h2>
                <p className="text-base">{household.description}</p>
              </div>
              <Button label="Join Household" action={handleJoinHousehold} isLoading={isLoading} />
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 mt-6 h-full">
              <div className="flex flex-col gap-y-5">
                <img
                  src={household.img_url} // Update this line to use the proper image URL field
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
      </main>
    </div>
  );
};

export default JoinHousehold;