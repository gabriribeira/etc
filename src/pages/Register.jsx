import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ImageUpload from "../components/common/ImageUpload";
import ThirdParty from "../components/auth/ThirParty";
import { useRegisterMutation } from "../app/api";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const navigate = useNavigate();
  //eslint-disable-next-line
  const [register, { isLoading, isError }] = useRegisterMutation();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        //eslint-disable-next-line
        const userData = await register({
          email,
          password,
        }).unwrap();
        console.log(userData);
        // Cookies.set("user", JSON.stringify(userData), { path: "/" });
        //navigate("/onboarding");
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
      {step === 1 && (
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
            <Link
              to={"/login"}
              className="font-light text-sm text-black70 mt-2"
            >
              Already have an account?{" "}
              <span className="underline">Log in now!</span>
            </Link>
          </div>
          <div className="flex justify-center gap-x-2 pb-5">
            <button
              onClick={() => setStep(1)}
              className="w-[10px] h-[10px] rounded-full bg-blue"
            ></button>
            <button
              onClick={() => setStep(2)}
              className="w-[10px] h-[10px] rounded-full bg-black50"
            ></button>
          </div>
        </form>
      )}
      {step === 2 && (
        <form className="bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 flex flex-col w-full max-h-[80dvh] h-full">
          <ImageUpload />
          <Input label="Username" value={username} onChange={setUsername} />
          <Input label="First Name" value={firstName} onChange={setFirstName} />
          <Input label="Last Name" value={lastName} onChange={setLastName} />
          <div className="flex flex-col items-end">
            <Button label="Create Account" action={handleRegister} />
            <Link
              to={"/login"}
              className="font-light text-sm text-black70 mt-2"
            >
              Already have an account?{" "}
              <span className="underline">Log in now!</span>
            </Link>
          </div>
          <div className="flex justify-center gap-x-2 pb-5">
            <div
              onClick={() => setStep(1)}
              className="w-[10px] h-[10px] rounded-full bg-black50"
            ></div>
            <div
              onClick={() => setStep(2)}
              className="w-[10px] h-[10px] rounded-full bg-blue"
            ></div>
          </div>
        </form>
      )}
    </div>
  );
};
export default Register;
