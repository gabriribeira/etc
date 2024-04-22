import React from "react";
import { Link } from "react-router-dom";
import { RiNotification4Line } from "react-icons/ri";

const NotificationsLink = () => {
  return (
    <Link
      to={"/notifications"}
      className="text-3xl text-black absolute top-7 right-5"
      aria-label="Notifications"
    >
      <RiNotification4Line />
    </Link>
  );
};

export default NotificationsLink;
