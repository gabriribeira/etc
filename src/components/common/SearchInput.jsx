import React from "react";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ label, value, onChange, error, results, onSelect, placeholder }) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={label} className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <div className="flex relative w-full items-center">
        <input
          name={label}
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`border-2 rounded-xl p-2 border-black40 bg-white focus:border-black focus:outline-none text-lg placeholder:text-black40 text-black w-full pr-10`}
          placeholder={placeholder}
        />
        <CiSearch className="absolute right-3 text-2xl text-black40" />
        {results && value.length > 0 && (
          <div className="w-full absolute bg-white rounded-xl shadow-xl mt-2 border-2 border-black border-t-0 rounded-t-none top-[100%] pt-2 z-10">
            {results &&
              results.map(
                (result, index) =>
                  index < 3 && (
                    <button
                      key={index}
                      className="flex flex-col p-2 w-full"
                      onClick={() => {
                        onSelect(result);
                        onChange("");
                      }}
                    >
                      <div className="flex items-center gap-x-2">
                        <img
                          //eslint-disable-next-line
                          src={result.img_url}
                          alt="Result"
                          className="w-[20px] h-[20px] rounded-full"
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-lg">{result.name}</p>
                      </div>
                      {result.description && (
                        <p className="text-black40 text-sm line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </button>
                  )
              )}
          </div>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  results: PropTypes.array,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchInput;
