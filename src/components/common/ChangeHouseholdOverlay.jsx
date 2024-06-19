import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import {
  useGetUserHouseholdsQuery,
  useSwitchHouseholdMutation,
} from "../../app/api";
import { useSelector } from "react-redux";
import DefaultHouseholdImage from "../../assets/data/households/household_amizade.webp";

const ChangeHouseholdOverlay = ({ closeOverlay }) => {
  const user = useSelector((state) => state.auth.user);
  const currentHousehold = useSelector((state) => state.auth.currentHouseholdId);
  const { data, isLoading, error } = useGetUserHouseholdsQuery(user.id);
  const [switchHousehold] = useSwitchHouseholdMutation();

  useEffect(() => {
    if (data) {
      console.log(currentHousehold);
    }
  }, [data]);

  const handleSwitchHousehold = async (householdId) => {
    try {
      await switchHousehold(householdId).unwrap();
      window.location.reload();
      closeOverlay();
    } catch (error) {
      console.error("Failed to switch household:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    data && (
      <div className="fixed h-screen w-screen top-0 left-0 z-[110]">
        <div
          onClick={closeOverlay}
          className="fixed h-screen w-screen bg-black/20 top-0 left-0"
        ></div>
        <div className="absolute bg-white bottom-0 z-[111] left-0 w-screen rounded-t-[2rem] px-5 py-10">
          <div className="absolute top-[10px] left-0 w-screen flex justify-center">
            <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-y-3 mb-6">
            <h1 className="font-semibold text-xl text-black">Households</h1>
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            {data.data.map((household) => (
              <button
                key={household.id}
                className={`flex items-center justify-between rounded-2xl p-3 ${
                  currentHousehold === household.id
                    ? "bg-black90 text-white"
                    : "border-2 border-black text-black"
                }`}
                onClick={() => {
                  currentHousehold !== household.id &&
                    handleSwitchHousehold(household.id);
                }}
              >
                <div className="flex items-center gap-x-3 w-full">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
                    <img
                      src={household.img_url ? household.img_url : DefaultHouseholdImage}
                      alt="Household Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h2 className="text-lg font-normal">{household.name}</h2>
                </div>
              </button>
            ))}
          </div>
          <Button
            label={"Join or Create Household"}
            to="/households/onboarding"
            action={closeOverlay}
            stroke={true}
          />
        </div>
      </div>
    )
  );
};

ChangeHouseholdOverlay.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};

export default ChangeHouseholdOverlay;
