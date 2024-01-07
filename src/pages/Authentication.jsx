import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/imgs/etc/logo_salmon.webp";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Authentication = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue flex flex-col min-h-screen justify-between">
      <div className="flex justify-center items-center h-full min-h-[50dvh]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" />
      </div>
      <form className="h-auto bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 max-h-[50dvh]">
        <Input label="Username" value={username} onChange={setUsername} />
        <div className="flex flex-col">
          <Input label="Password" value={password} onChange={setPassword} />
          <div className="flex items-center justify-between mt-2 text-sm font-light">
            <div className="flex items-center ">
              <button className="mr-1 rounded-sm w-[15px] h-[15px] border-[1px] border-black focus:outline-none focus:border-black"></button>
              <p className="font-light text-sm text-black70">Remember me</p>
            </div>
            <a href="#" className="font-light underline text-sm text-black70">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Button label="Log In" submit={true} />
          <Link
            to={"/register"}
            className="font-light text-sm text-black70 mt-2"
          >
            Don&apos;t have an account yet?{" "}
            <span className="underline">Register now!</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Authentication;
