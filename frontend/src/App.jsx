import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Navbarmenu from "./components/Navbarmenu";
import Agent from "./components/Agent";
import Expenditure from "./components/Expenditure";
import { Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
export default function App() {
  const exepnditure_sum = {"food":0,"EMI":0,"entertainment":0,"shopping":0,"travelling":0,"health":0,"unknown":0}
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [parsedData,setParsedData] = useState(exepnditure_sum);
  const [isOpen,setIsOpen] = useState(true)
  return (
    <div className="flex  overflow-y-auto">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white px-3 py-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block sm:w-1/3 lg:w-1/5 md:w-2/3 h-screen  absolute md:static transition-all duration-300`}
      >
        <Navbarmenu />
       
      </div>
      <div
        className="flex-grow h-screen lg:w-3/5 md:w-3/8 bg-sky-50 p-4 transition-all duration-300">
       <Expenditure data={parsedData}/>
      </div>
      <div className="hidden md:block lg:w-1/5 bg-sky-50 p-4 overflow-y-auto">
        <Agent />
      </div>
      
       <Routes>
         
          {isOpen && <Route path="/my-uploads" element={<Upload onParsedData={setParsedData} onClose={() => setIsOpen(false)}/>}/>}
       
        </Routes>
    </div>
  );
}
