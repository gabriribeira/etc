import React from "react";
import PropTypes from "prop-types";

const ThirdParty = ({ authentication }) => {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <a
        //eslint-disable-next-line
        href={`${process.env.PLATFORM_BACKEND_URL}/auth/google`}
        className="border-2 rounded-xl border-black p-3"
      >
        {!authentication ? "Sign up with Google" : "Log in with Google"}
      </a>
      <a
        //eslint-disable-next-line
        href={`${process.env.PLATFORM_BACKEND_URL}/auth/facebook`}
        className="border-2 rounded-xl border-black p-3"
      >
        {!authentication ? "Sign up with Facebook" : "Log in with Facebook"}
      </a>
    </div>
  );
};

ThirdParty.propTypes = {
  authentication: PropTypes.bool,
};

export default ThirdParty;
