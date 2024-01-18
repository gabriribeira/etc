import React from "react";
import PropTypes from "prop-types";

const DividerTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center w-full">
      {tabs &&
        tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex justify-center items-center py-2 cursor-pointer transition-all duration-300 rounded-lg ${
              activeTab === index ? "bg-salmon text-black w-[65%]" : "w-[35%]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <p className="text-lg">{tab}</p>
          </button>
        ))}
    </div>
  );
};

DividerTabs.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func,
};

export default DividerTabs;
