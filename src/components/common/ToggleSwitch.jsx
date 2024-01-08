import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`toggle-switch w-[70px] h-[40px] bg-black40 rounded-full relative pointer ${isChecked ? "checked bg-salmon" : ""}`}
      onClick={handleToggle}
    >
      <div className="toggle-knob w-[30px] h-[30px] bg-white rounded-full absolute top-[50%] ml-1" />
    </div>
  );
};

export default ToggleSwitch;
