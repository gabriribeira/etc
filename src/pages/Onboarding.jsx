import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import iconLogo from "../assets/imgs/etc/short_logo_salmon.webp";
import iconSetup from "../assets/imgs/icon/setup.png";
import iconCart from "../assets/imgs/icon/cart.png";
import iconSustainable from "../assets/imgs/icon/sustainable.png";
import iconAI from "../assets/imgs/icon/ai.png";

const OnboardingPage = ({ image, title, text }) => {
  return (
    <div
      className="onboarding-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "121px",
          height: "153px",
          marginBottom: "20px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          alt="Onboarding"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h4>
        <p
          style={{
            textAlign: "center",
            fontSize: "15px",
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

OnboardingPage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isLastPage: PropTypes.bool.isRequired,
};

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    {
      image: iconLogo,
      title: "welcome to etc!",
      text: "create and manage collaborative shopping lists with ease.",
    },
    {
      image: iconSetup,
      title: "household setup",
      text: "start collaborating on shopping and expenses.",
    },
    {
      image: iconCart,
      title: "choose your sustainable goals",
      text: "add products with specific details and preferred stores.",
    },
    {
      image: iconSustainable,
      title: "creating a shopping list",
      text: "add products with specific details and preferred stores.",
    },
    {
      image: iconAI,
      title: "AI assistance",
      text: "empower your lists with assistance for smarter shopping decisions!",
    },
  ];

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="onboarding"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="onboarding-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="onboarding-content"
          style={{ width: "121px", height: "350px" }}
        >
          <OnboardingPage
            {...pages[currentPage - 1]}
            isLastPage={currentPage === pages.length}
          />
        </div>
        <div
          className="navigation-buttons-container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div
            className="navigation-buttons"
            style={{ display: "flex", alignItems: "center" }}
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              style={{
                marginRight: "10px",
                visibility: currentPage === 1 ? "hidden" : "visible",
              }}
            >
              <span style={{ fontSize: "1.5em", color: "#BCBCBC" }}>{"<"}</span>
            </button>
            {[...Array(pages.length)].map((_, index) => (
              <div
                key={index}
                style={{
                  width: "11px",
                  height: "11px",
                  backgroundColor:
                    index + 1 === currentPage
                      ? currentPage === 3
                        ? "#3B7960"
                        : currentPage === 5
                          ? "linear-gradient(to right, #1F4F80, #FF6F61)"
                          : "#646464"
                      : "#BCBCBC",
                  margin: "0 5px",
                  borderRadius: "50%",
                  boxShadow: "0 0 3px rgba(0,0,0,0.3)",
                  transition: "width 0.3s, border-radius 0.3s",
                  ...(currentPage === index + 1
                    ? { width: "55px", borderRadius: "8px" }
                    : null),
                  ...(currentPage === 5 && index === currentPage - 1
                    ? {
                        background:
                          "-webkit-linear-gradient(left, #1F4F80, #FF6F61)",
                      }
                    : null),
                }}
              />
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              style={{
                marginLeft: "10px",
                visibility: currentPage === pages.length ? "hidden" : "visible",
              }}
            >
              <span style={{ fontSize: "1.5em", color: "#BCBCBC" }}>{">"}</span>
            </button>
          </div>
        </div>
        <div
          className="button-container"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {currentPage === pages.length && (
            <Link to="/households/1">
              <Button
                label="Go to household"
                action={() => console.log("clicado")}
              />
            </Link>
          )}
        </div>
        {currentPage !== pages.length && (
          <div
            className="skip-link"
            style={{ position: "absolute", top: "20px", right: "20px" }}
          >
            <Link
              to="/households/1"
              style={{
                textDecoration: "underline",
                fontSize: "14px",
                color: "#7A7A7A",
              }}
            >
              Skip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
