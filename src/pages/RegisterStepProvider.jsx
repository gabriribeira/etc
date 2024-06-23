import React, { useState } from "react";
import Logo from "../assets/imgs/etc/logo_salmon.webp";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import CategoriesInput from "../components/common/CategoriesInput";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useAddUserSpecificationsMutation } from "../app/api";
import { useSelector } from "react-redux";
import { updateUserState } from "../app/authSlice";
import { useDispatch } from "react-redux";

const RegisterStepProvider = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [updateUser] = useUpdateUserMutation();
  const [addUserSpecifications] = useAddUserSpecificationsMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleUpdateUser = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", `${firstName} ${lastName}`);
    try {
      const response = await updateUser({ id: user.id, formData }).unwrap();
      console.log("Update user response:", response);
      await addUserSpecifications({ userId: user.id, specifications }).unwrap();
      dispatch(updateUserState(response.data));
      navigate("/onboarding", { state: { message: "User created" } });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="bg-black bg-gradient-to-br from-black to-white/30 min-h-screen h-full flex flex-col justify-between">
      <div className="flex justify-center items-center h-full min-h-[20dvh]">
        <img src={Logo} alt="Et Cetera Logo" className="w-[60%]" referrerPolicy="no-referrer" />
      </div>
      <form
        className="bg-white rounded-tl-[5rem] flex flex-col px-6 py-12 gap-y-6 flex flex-col w-full max-h-[80dvh] h-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateUser();
        }}
      >
        <Input label="Username" value={username} onChange={setUsername} />
        <Input label="First Name" value={firstName} onChange={setFirstName} />
        <Input label="Last Name" value={lastName} onChange={setLastName} />
        <CategoriesInput
          label="Food Restrictions"
          onChange={setSpecifications}
          categorySelected={specifications}
          specificationsProps={true}
        />
        <div className="flex flex-col items-end">
          <Button label="Next" action={handleUpdateUser} />
        </div>
      </form>
    </div>
  );
};

export default RegisterStepProvider;