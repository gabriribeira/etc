import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const [user, setUser] = useState(null);

  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return setUser(JSON.parse(decodeURIComponent(value)));
      }
    }
    return null;
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (user) {
    return <Outlet />;
  } else {
    if (getCookieValue("user")) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default RequireAuth;
