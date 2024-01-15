import React from "react";
import PropTypes from "prop-types";
import { RxDotsVertical } from "react-icons/rx";

const Members = ({ users, admins }) => {
  return (
    <div className="flex flex-col px-5 mt-6 gap-y-3">
      <h1 className="font-semibold text-lg">Members</h1>
      {users.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-black10 rounded-2xl p-3"
        >
          <div className="flex items-center gap-x-3">
            <img
              //eslint-disable-next-line
              src={require(`../../assets/data/users/${user.img}`)}
              alt="User Profile Picture"
              className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
            />
            <p className="text-black text-lg font-semibold">{user.name}</p>
          </div>
          <div className="flex items-center gap-x-3">
            {
              admins.includes(user.id) &&
                <p className="text-black text-base font-light">Admin</p>
            }
            <button type="button" className="text-black text-2xl"><RxDotsVertical /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

Members.propTypes = {
  users: PropTypes.array.isRequired,
  admins: PropTypes.array,
};

export default Members;
