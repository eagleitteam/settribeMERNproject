import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./mainpage.css";

function Mainpage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="main-wrapper">
      <Sidebar isOpen={isOpen} />

      <div className={`content-wrapper ${isOpen ? "expanded" : "collapsed"}`}>
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        <div className="dashboard-container container-fluid">
          <div className="dashboard-card">

           {/* 👇 Pages Render Here */}
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Mainpage;
