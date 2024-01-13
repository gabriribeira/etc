import React from "react";
import PropTypes from "prop-types";
import { IoSearchOutline } from "react-icons/io5";

const SearchFilter = ({ onChange, value }) => {
  return (
    <div className="flex w-full relative items-center">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-2 rounded-xl px-2 py-1 border-black40 bg-white focus:border-black focus:outline-none text-lg placeholder:text-black40 placeholder:pl-7 text-black w-full`}
        placeholder={"Search"}
      />
      <div className="absolute left-[3%] text-black40 text-xl"><IoSearchOutline /></div>
    </div>
  );
};

SearchFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchFilter;
