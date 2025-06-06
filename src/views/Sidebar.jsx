import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useStateContext } from "../contexts/ContextProvider";
import "./Sidebar.css";
  
import Chatbot from "../assets/chatbot.png";
const Sidebar = () => {
   const navigate = useNavigate();
 
  const handleNavigation = (path) => {
    navigate(path);
  };

    const buttonStyles = (path) => ({
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
 
    color: location.pathname === path ? "#0D85D8" : "#ffffff",
    cursor: "pointer",
  
    border: "none",
    textAlign: "left",
    textDecoration: "none",
    fontSize: "1.25rem",
  });     


  return (
  <div className="w-80  p-4 mt-1 h-[90%] overflow-y-auto custom-scrollbar overflow-x-hidden">
     <div style={{ textAlign: "center", marginTop: "5px" }}>
            <img
              src={Chatbot}
              alt="Agent Logo"
              style={{
                width: "75%",
                height: "165px",
                display: "block",
                margin: "0 auto",
              }}
            />
               <nav className="bg-gray-900"
          style={{
            marginTop: "10px",
          
            padding: "6px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              color: "#333",
              textAlign: "left",
            }}
          >
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                  
                onClick={() => handleNavigation("/")}
                style={buttonStyles("/")}
              className="bg-gray-900"
              >
               💾 Data Connection
              </button>
            </li>
           
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => handleNavigation("/openAIConfig")}
                style={buttonStyles("/openAIConfig")}
              >
              
                🧠 OpenAI-Configuration
              </button>
            </li>
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                className="whitespace-nowrap"
                onClick={() => handleNavigation("/chatbot")}
                style={buttonStyles("/chatbot")}
              >
                🤖 Chatbot Playgrond
              </button>
            </li>
         
          </ul>
        </nav>
      
          </div>
      {/* Add your image here */}
     </div>
  );
};

export default Sidebar;