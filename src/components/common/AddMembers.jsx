import React from "react";
import ProfilePicture from "../../assets/data/users/gabriribeira.webp";
import { RxPlus } from "react-icons/rx";

const AddMembers = () => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-lg font-semibold">Members</label>
      <div className="flex items-center gap-x-2">
        <button className="w-[35px] h-[35px] rounded-full relative flex justify-center items-center">
          <img src={ProfilePicture} alt="Authenticated User Profile Picture" className="w-full h-full rounded-full absolute object-cover object-center left-0 top-0" />
        </button>
        <button className="w-[35px] h-[35px] rounded-full relative flex justify-center items-center text-xl bg-black10">
            <RxPlus />
        </button>
      </div>
    </div>
  );
};
export default AddMembers;
