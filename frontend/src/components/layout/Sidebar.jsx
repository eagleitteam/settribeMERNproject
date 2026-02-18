import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCalendarAlt, FaCheckSquare } from "react-icons/fa";
import "./sidebar.css";


const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="logo">
        {isOpen ? "Menu Bar" : "M"}
      </div>

      <ul>
        <li>
          <NavLink to="/" className="menu-link">
          <FaTachometerAlt className="icon" />
          <span className={`menu-text ${!isOpen && "hide"}`}>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/meetings" className="menu-link">
          <FaCalendarAlt className="icon" />
          <span className={`menu-text ${!isOpen && "hide"}`}>Meetings</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/tasks" className="menu-link">
          <FaCheckSquare className="icon" />
          <span className={`menu-text ${!isOpen && "hide"}`}>Tasks</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
