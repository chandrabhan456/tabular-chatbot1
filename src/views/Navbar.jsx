import React, { useEffect, useState } from "react";

import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import nttlogo from "../assets/nttdatalogo.svg";

import "./navbar.css";

const Navbar = () => {
  const {
    
    mainPage,
    setMainPage,
    setlogin1
    
  } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setlogin1(false);  // Set login state to false
    navigate('/');         // Navigate to the root path
  };
  return (
    <div >
      <div className="flex justify-between md:mx-0  relative w-full dark:bg-black">
        <div className="flex">
          <img
            style={{ width: "250px", marginLeft: "-5px", marginTop: "-5px" }}
            className=""
            src={nttlogo}
            alt="nttlogo"
          />
          <div
            className="mt-2 text-3xl"
          
            style={{ cursor: "pointer" }}
          >
            Tabular Chatbot
          </div>
        </div>

        <div
          className={`relative inline-flex rounded-full h-2 right-4 top-1.5`}
        >
         
          <div
            style={{ marginLeft: "-30px" }}
            className="flex items-center justify-center mt-5 cursor-pointer"
           
          >
          
            <div class="cursor-pointer w-24 text-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"  onClick={handleLogout}>
  Logout
</div>

          </div>

       
        </div>
      </div>
    </div>
  );
};

export default Navbar;