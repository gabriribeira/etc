import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";

const Activity = ({ activity }) => {
  const usersData = UsersData;
  const [member, setMember] = useState(null);
  useEffect(() => {
    if (usersData) {
      setMember(usersData.find((user) => user.id == activity.img));
    }
  }, [usersData, activity]);
  return (
    member &&
    <div className="flex items-center w-full text-black gap-x-3">
      <div className="w-[60px] h-[60px] flex items-center justify-cente relative shrink-0 rounded-full">
        <img
          //eslint-disable-next-line
          src={require(`../../assets/data/users/${member.img}`)}
          className="w-full h-full object-center top-0 left-0 absolute object-cover rounded-full"
          alt="User Profile Picture"
        />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-base">{activity.text}</p>
        <p className="font-light text-sm">30 minutes ago</p>
      </div>
    </div>
  );
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default Activity;
