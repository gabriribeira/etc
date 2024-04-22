import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const ConfirmationDialog = ({ title, details, label, bg, showConfirmation, setShowConfirmation, action }) => {
  return (
    <CSSTransition
      in={showConfirmation}
      timeout={500}
      unmountOnExit
    >
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[102] bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <p><strong>{title}</strong></p>
          <p className="items-center mb-3 mt-2 px-3 text-center">{details}</p>
          <div className="flex justify-end mt-3">
            {label !== "Close" &&
            <button className="bg-white border-2 border-black text-black px-8 py-2 rounded-md mr-3" style={{minWidth: '120px'}} onClick={() => setShowConfirmation(false)}>Cancel</button>
            }
            <button className={`${bg === "bg-red-600" ? "bg-red-600" : "bg-blue"} text-white px-8 py-2 rounded-md`} style={{minWidth: '120px'}} onClick={action}>{label}</button>

          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

ConfirmationDialog.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  label: PropTypes.string,
  bg: PropTypes.string,
  showConfirmation: PropTypes.bool.isRequired,
  setShowConfirmation: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
