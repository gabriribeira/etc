import React from "react";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-blue px-5">
      <h1 className="font-bold text-6xl">404</h1>
      <p className="font-light text-xl">Page not found</p>
      <Link to="/" className="font-light text-xl underline text-blue">
        <img src={Logo} alt="Etc Logo" className="w-full" />
      </Link>
    </div>
  );
};

export default NotFound;
