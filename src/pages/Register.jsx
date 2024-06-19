import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ThirdParty from "../components/auth/ThirParty";
import { useRegisterMutation } from "../app/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState } from "../app/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [register, { isLoading, isError }] = useRegisterMutation();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        const userData = await register({
          email,
          password,
        }).unwrap();

        dispatch(
          setAuthState({
            isAuthenticated: true,
            user: userData.user,
            currentHouseholdId: userData.currentHouseholdId,
            roleId: userData.roleId,
          })
        );
        navigate("/register/step2");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="bg-black bg-gradient-to-br from-black to-white/30 min-h-screen h-full flex flex-col justify-between">
      <div className="flex justify-center items-center h-full min-h-[20dvh]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" />
      </div>
      <form className="bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 max-h-[80dvh] h-full">
        <ThirdParty authentication={false} />
        <Input label="Email" value={email} onChange={setEmail} />
        <Input label="Password" value={password} onChange={setPassword} />
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <div className="flex flex-col items-end">
          <Button label="Next" action={() => handleRegister()} />
          <Link to={"/login"} className="font-light text-sm text-black70 mt-2">
            Already have an account?{" "}
            <span className="underline">Log in now!</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
