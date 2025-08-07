import React from "react";


import profile_picture from "../images/profile_picture.jpg";

import { Link } from "react-router-dom";
export default function Navbarmenu({ className = "" }) {
  
  
  
  const menuItems = [
    { label: "Dashboard", link: "/dashboard", icon: "🏠" },
    { label: "Transactions", link: "/transactions", icon: "💳" },
    { label: "smart Advsior", link: "/smart-advisor", icon: "🧠" },
    { label: "My uploads", link: "/my-uploads", icon: "📤" },
    { label: "Monthly Summary", link: "/monthly-summary", icon: "📅" },
    { label: "Settings", link: "/settings", icon: "⚙️" },
    { label: "Logout", link: "/logout", icon: "🚪" },
  ];
  return (
    <div className="flex">
     
     
      <div className="flex flex-col h-screen bg-gray-800 bg-opacity-80 p-[10%] sm:w-[100%] lg:w-[100%] md:w-[100%]  overflow-hidden 
          text-white Items-center">
        <div className="flex h-[20%]">
          <img
            src={profile_picture}
            alt="Profile"
            className="w-15 h-15 rounded-full border-4 border-black shadow-md"
          />
        </div>
        <ul className="flex flex-col h-[80%] pt-[50%] Items-center gap-4">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:text-black cursor-pointer">
              <span>{item.icon}</span>
              <Link to={item.link}>
                {item.label} </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
