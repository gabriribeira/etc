import React from "react";

const Widgets = () => {
  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="w-full rounded-2xl p-3 bg-blue80 text-white">
        <h2 className="text-base font-light">Shopping Lists</h2>
        <h1 className="font-semibold text-4xl">3</h1>
        <p className="font-light text-base">
          products in{" "}
          <span className="font-semibold">Groceries at Mercadona</span>
        </p>
      </div>
      <div className="flex w-full gap-x-3 text-white">
        <div className="w-[50%] bg-black rounded-2xl p-3 h-[180px] flex flex-col justify-between">
          <h2 className="text-base font-light">Tasks</h2>
          <div className="flex flex-col">
            <h1 className="font-semibold text-4xl">1</h1>
            <p className="font-light text-base">left to complete</p>
          </div>
        </div>
        <div className="w-[50%] bg-salmon rounded-2xl p-3 h-[180px] flex flex-col justify-between">
          <h2 className="text-base font-light">Expenses</h2>
          <div className="flex flex-col">
            <h1 className="font-semibold text-4xl">
              12.60<span className="font-light text-3xl">€</span>
            </h1>
            <p className="font-light text-base">left to pay</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-green rounded-2xl p-3 text-white">
        <h2 className="text-base font-light">Household Goal</h2>
        <div className="flex flex-col mt-2">
          <h1 className="font-semibold text-4xl">6/10</h1>
          <p className="font-light text-base">
            times to achieve{" "}
            <span className="font-semibold">Zero Waste Month!</span>
          </p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-white font-light text-sm mb-1">60%</p>
          
        </div>
      </div>
    </div>
  );
};

export default Widgets;
