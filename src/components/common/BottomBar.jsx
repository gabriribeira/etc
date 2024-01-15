import React from "react";
import { Link, useLocation } from "react-router-dom";

import { IoWalletOutline, IoCheckboxOutline } from "react-icons/io5";
import { TbShoppingCart, TbUsers } from "react-icons/tb";
import { GoHome } from "react-icons/go";

// Navbar inferior presente em todos os screens

const BottomBar = () => {
    const location = useLocation();
  return (
    <>
    <div className="h-[80px]">

    </div>
    <div className="fixed bottom-0 w-screen bg-white flex items-center justify-between text-black px-5 h-[80px] text-4xl z-[100]">
      <Link to="/expenses" className={`flex flex-col items-center leading-5 ${location.pathname === '/expenses' && 'text-blue'}`}><IoWalletOutline /><p className="text-[12px]">Expenses</p></Link>
      <Link to="/lists" className={`flex flex-col items-center leading-5 ${location.pathname === '/lists' && 'text-blue'}`}><TbShoppingCart /><p className="text-[12px]">Lists</p></Link>
      <Link to="/" className={`flex flex-col items-center leading-5 ${location.pathname === '/' && 'text-blue'}`}><GoHome /><p className="text-[12px]">Home</p></Link>
      <Link to="/tasks" className={`flex flex-col items-center leading-5 ${location.pathname === '/tasks' && 'text-blue'}`}><IoCheckboxOutline /><p className="text-[12px]">Tasks</p></Link>
      <Link to="/households/1" className={`flex flex-col items-center leading-5 ${location.pathname === '/households/1' && 'text-blue'}`}><TbUsers /><p className="text-[12px]">Household</p></Link> {/* TODO: Mudar para o id do household correto */}
    </div>
    </>
  );
};

export default BottomBar;
