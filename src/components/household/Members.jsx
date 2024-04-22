import React from "react";
import PropTypes from "prop-types";
import { RxDotsVertical } from "react-icons/rx";
import { Link } from "react-router-dom";

const Members = ({ users, admins }) => {
  return (
    <div className="flex flex-col px-5 gap-y-3">
      <h1 className="font-semibold text-lg">Members</h1>
      {users.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-black bg-gradient-to-r from-black to-white/30 text-white shadow-lg rounded-2xl p-3"
        >
          <Link to={`/users/${user.id}`} className="flex items-center gap-x-3">
            <img
              //eslint-disable-next-line
              src={require(`../../assets/data/users/${user.img}`)}
              alt="User Profile Picture"
              className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
            />
            <p className="text-white text-lg font-light">{user.name}</p>
          </Link>
          <div className="flex items-center gap-x-3">
            {
              admins.includes(user.id) &&
                <p className="text-white text-base font-light">Admin</p>
            }
            <button type="button" className="text-white text-2xl" aria-label="Edit member"><RxDotsVertical /></button>
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
