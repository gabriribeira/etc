import React from "react";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Button from "../components/common/Button";

const HouseholdOnboarding = () => {
  return (
    <div className="bg-black bg-gradient-to-br from-black to-white/30 min-h-screen h-full flex flex-col justify-between">
      <div className="flex justify-center items-center h-full min-h-[70dvh]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" referrerPolicy="no-referrer" />
      </div>
      <div className="h-[30dvh] bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6">
        <Button label="Create a Household" to={"/households/new"} lg={true} />
        <Button
          label="Join a Household"
          to={"/households/join"}
          stroke={true}
          lg={true}
        />
        <p className="font-light text-sm text-black70 text-center">
          Do you want to manage your household?
          <br />
          Choose one of the options to start.
        </p>
      </div>
    </div>
  );
};
export default HouseholdOnboarding;