import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ checked }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (checked) {
      setIsChecked(true);
    }
  }, [checked]);

  return (
    <div
      className={`toggle-switch w-[70px] h-[40px] bg-black40 rounded-full relative pointer ${
        isChecked ? "checked bg-salmon" : ""
      }`}
      onClick={handleToggle}
    >
      <div className="toggle-knob w-[30px] h-[30px] bg-white rounded-full absolute top-[50%] ml-1" />
    </div>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
};

export default ToggleSwitch;
