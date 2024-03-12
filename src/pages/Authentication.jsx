import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import UserData from "../data/users.json";
import HouseholdsData from "../data/households.json";
import Cookies from "js-cookie";

const Authentication = () => {
  const users = UserData;
  const householdsData = HouseholdsData;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememeberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    const user = users.find((user) => user.username === username);
    if (user && user.password === password) {
      const household = householdsData.find(
        (household) => household.id === user.households[0]
      );
      console.log(household);
      if (household) {
        console.log(household);
        console.log("Login successful");
        Cookies.set("user", JSON.stringify(user), { path: "/" });
        Cookies.set("household", JSON.stringify(household), { path: "/" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="bg-black bg-gradient-to-br from-black to-white/30 flex flex-col min-h-screen justify-between">
      <div className="flex justify-center items-center h-full min-h-[50dvh] shadow-[0px_-10px_30px_-20px_rgba(0,0,0,0.5)]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%] shadow-2xl" />
      </div>
      <form className="h-auto bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 max-h-[50dvh]">
        <Input label="Username" value={username} onChange={setUsername} />
        <div className="flex flex-col">
          <Input label="Password" value={password} onChange={setPassword} />
          <div className="flex items-center justify-between mt-2 text-sm font-light">
            <div className="flex items-center ">
              <button
                type="button"
                className={`mr-1 rounded-sm w-[15px] h-[15px] border-[1px] border-black ${rememeberMe ? "bg-black80" : "bg-white"} focus:outline-none focus:border-black`}
                onClick={() => setRememberMe(!rememeberMe)}
              ></button>
              <p className="font-light text-sm text-black70">Remember me</p>
            </div>
            <button type="button" className="font-light underline text-sm text-black70">
              Forgot password?
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Button label="Log In" action={() => handleLogin()} />
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
