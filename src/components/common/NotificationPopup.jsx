import React, { useEffect } from "react";
import PropTypes from "prop-types";

const NotificationPopup = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500); // 2.5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[15%] opacity-90 left-1/2 transform -translate-x-1/2 z-[9999999999999999999] bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
      <span>{message}</span>
    </div>
  );
};

NotificationPopup.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationPopup;