import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Cookies from "js-cookie";
import ThirdParty from "../components/auth/ThirParty";
import { useLoginMutation } from "../app/api";

const Authentication = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememeberMe, setRememberMe] = useState(false);
  //eslint-disable-next-line
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const userData = await login({
        email,
        password,
      }).unwrap();

      // Handle successful login
      console.log('Login successful:', userData);
      Cookies.set('user', JSON.stringify(userData), { path: '/' });
      navigate('/lists');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="bg-black bg-gradient-to-br from-black to-white/30 flex flex-col min-h-screen justify-between">
      <div className="flex justify-center items-center h-full min-h-[30dvh] shadow-[0px_-10px_30px_-20px_rgba(0,0,0,0.5)]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%] shadow-2xl" referrerPolicy="no-referrer" />
      </div>
      <form className="h-auto bg-white rounded-tl-[5rem] flex flex-col px-6 pt-6 gap-y-3 min-h-[60dvh]" aria-label="Enter Form">
        <ThirdParty authentication={true} />
        <Input label="Email" value={email} onChange={setEmail} className="w-[200px] lg:w-[150px]" />
        <div className="flex flex-col">
          <Input label="Password" value={password} onChange={setPassword} />
          <div className="flex items-center justify-between mt-2 text-sm font-light">
            <div className="flex items-center ">
              <button
                type="button"
                className={`mr-1 rounded-sm w-[15px] h-[15px] border-[1px] border-black80 ${rememeberMe ? "bg-black80" : "bg-white"} focus:outline-none focus:border-black80`}
                onClick={() => setRememberMe(!rememeberMe)} aria-label="Button remember me"
              ></button>
              <p className="font-light text-sm text-black80">Remember me</p>
            </div>
            <button type="button" className="font-light underline text-sm text-black70" aria-label="Forgot password?">
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
