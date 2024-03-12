import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import BackButton from "./BackButton";
import { CSSTransition } from "react-transition-group";
import Overlay from "./Overlay";

const TopBar = ({ description }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [showBackButton, setShowBackButton] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          setUser(JSON.parse(decodeURIComponent(value)));
        }
      }
    };
    getCookieValue("user");
  }, []);

  const isEditPage = () => {
    const editPageRegex = /\/(tasks|lists)\/\d+\/(new|edit|item)/;
    const balancePageRegex = /\/expenses\/balance/;
    const newExpensePageRegex = /\/expenses\/new/;
    return (
      editPageRegex.test(location.pathname) ||
      balancePageRegex.test(location.pathname) ||
      newExpensePageRegex.test(location.pathname)
    );
  };

  useEffect(() => {
    if (isEditPage()) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [location]);

  return (
    <div className="flex flex-col sticky top-0 w-screen pb-5 px-5 pt-3 z-[100] bg-white">
      <div className="flex items-center justify-between gap-x-2 relative">
        {user && (
          <Link
            to={`/users/${user.id}`}
            className="flex items-center gap-x-3 z-[101]"
          >
            <img
              //eslint-disable-next-line
              src={require(`../../assets/data/users/${user.img}`)}
              alt="User Profile Picture"
              className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
            />
          </Link>
        )}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/imgs/etc/short_logo_salmon.webp`)}
            alt="User Profile Picture"
            className="h-[25px]"
          />
        </div>
        <div className="flex items-center gap-x-5">
          <button
            type="button"
            onClick={() => {
              setShowSettings(!showSettings);
            }}
            className="text-2xl z-[101]"
          >
            <RxDotsHorizontal />
          </button>
        </div>
        <CSSTransition
          in={showSettings === true}
          timeout={500}
          classNames="menu-primary"
          className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
          unmountOnExit
        >
          <Overlay
            label="SETTINGS"
            options={["About", "Logout"]}
            links={["/about", "/login"]}
            hideOverlay={() => setShowSettings(false)}
          />
        </CSSTransition>
      </div>
      {showBackButton && (
        <div className="mt-10">
          <BackButton />
        </div>
      )}
      {description && (
        <p className="text-black60 text-base mt-2">{description}</p>
      )}
    </div>
  );
};

TopBar.propTypes = {
  text: PropTypes.string,
  description: PropTypes.string,
};

export default TopBar;
