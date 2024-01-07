import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ImageUpload from "../components/common/ImageUpload";

const Register = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="bg-blue min-h-screen h-full flex flex-col justify-between">
      <div className="flex justify-center items-center h-full min-h-[30dvh]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" />
      </div>
      {step === 1 && (
        <form className="bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 max-h-[70dvh] h-full">
          <Input label="Username" value={username} onChange={setUsername} />
          <Input label="Email" value={email} onChange={setEmail} />
          <Input label="Password" value={password} onChange={setPassword} />
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <div className="flex flex-col items-end">
            <Button label="Next" action={() => setStep(2)} />
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
        <form className="bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 flex flex-col w-full max-h-[70dvh] h-full">
          <ImageUpload />
          <Input label="First Name" value={firstName} onChange={setFirstName} />
          <Input label="Last Name" value={lastName} onChange={setLastName} />
          <div className="flex flex-col items-end">
            <Button label="Create Account" to={"/onboarding"} />
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
