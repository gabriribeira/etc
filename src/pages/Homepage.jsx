import React from "react";
import BottomBar from "../components/common/BottomBar";
import '../index.css'; 

const Homepage = () => {
  return (
    <div>
      <div className="rectangle">
        <p className="pt-5">Shopping Lists</p>
        <h1>3</h1>
        <p>products in <b>Groceries at Mercadona</b></p>
      </div>
      <div className="square-container pt-3">
        <div className="square1">
          <p className="pt-5">Tasks</p>
          <h1 className="pt-5 mt-5">1/2</h1>
          <p>left to complete</p>
        </div>
        <div className="space"></div>
        <div className="square2">
        <p className="pt-5">Expenses</p>
        <h1 className="pt-5 mt-5">12,60€</h1>
          <p>left to pay</p>
        </div>
      </div>
      <div className="rectangle2">
        <p className="pt-5">Household Goal</p>
        <h1>6/10</h1>
        <p>times to achieve <b>Zero Waste Month!</b></p>
      </div>
      <BottomBar />
    </div>
  );
};

export default Homepage;