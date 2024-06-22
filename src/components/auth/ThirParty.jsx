import React from "react";
import PropTypes from "prop-types";

const ThirdParty = ({ authentication }) => {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <a
        //href={`http://localhost:3001/api/auth/google`}
        href={`https://etc-app.com/api/auth/google`}
        className="border-2 rounded-xl border-black p-3 flex items-center justify-center"
      >
        <img
          src="https://www.google.com/chrome/static/images/chrome-logo.svg"
          alt="Google logo"
          className="w-6 h-6 mr-2"
        />
        {!authentication ? "Sign up with Google" : "Continue with Google"}
      </a>
      <a
        //href={`http://localhost:3001/api/auth/facebook`}
        href={`https://etc-app.com/api/auth/facebook`}
        className="border-2 rounded-xl border-black p-3 flex items-center justify-center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook logo"
          className="w-6 h-6 mr-2"
        />
        {!authentication ? "Sign up with Facebook" : "Continue with Facebook"}
      </a>
    </div>
  );
};

ThirdParty.propTypes = {
  authentication: PropTypes.bool,
};

export default ThirdParty;
