import React from "react";
import PropTypes from "prop-types";

const ThirdParty = ({ authentication }) => {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <a
        //href={`http://localhost:3001/api/auth/google`}
        href={`https://etc-app.com/api/auth/google`}
        className="border-2 rounded-xl border-black p-3"
      >
        {!authentication ? "Sign up with Google" : "Log in with Google"}
      </a>
      <a
        //href={`http://localhost:3001/api/auth/facebook`}
        href={`https://etc-app.com/api/auth/facebook`}
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
