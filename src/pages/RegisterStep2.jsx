import React, { useState } from "react";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ImageUpload from "../components/common/ImageUpload";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../app/api";

const RegisterStep2 = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const handleUpdateUser = async () => {
    try {
      await updateUser({ username, name: `${firstName} ${lastName}`, img_url: imgUrl }).unwrap();
      navigate("/onboarding");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="bg-black bg-gradient-to-br from-black to-white/30 min-h-screen h-full flex flex-col justify-between">
      <div className="flex justify-center items-center h-full min-h-[20dvh]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" />
      </div>
      <form
        className="bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 flex flex-col w-full max-h-[80dvh] h-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateUser();
        }}
      >
        <ImageUpload onImageUpload={setImgUrl} />
        <Input label="Username" value={username} onChange={setUsername} />
        <Input label="First Name" value={firstName} onChange={setFirstName} />
        <Input label="Last Name" value={lastName} onChange={setLastName} />
        <div className="flex flex-col items-end">
          <Button label="Next" action={handleUpdateUser} />
        </div>
      </form>
    </div>
  );
};

export default RegisterStep2;
