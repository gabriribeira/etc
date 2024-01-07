import React from "react";

import Logo from "../assets/imgs/etc/logo_salmon.webp";

import Button from "../components/common/Button";

const Onboarding = () => {
  return (
    <div className="bg-blue h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-center items-center h-full">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" />
        <p className="text-lg text-white text-center mt-2">welcome to a new experience<br />of living together</p>
      </div>
      <div className="h-auto bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6">
        <Button label="Create a Household" to={"/households/new"} lg={true} />
        <Button
          label="Join a Household"
          to={"/join"}
          bg="bg-salmon"
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
export default Onboarding;
