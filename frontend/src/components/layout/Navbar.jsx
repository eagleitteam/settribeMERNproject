import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

   const navigate = useNavigate();
  // user data from login
  const user = JSON.parse(localStorage.getItem("user"));

   const handleLogout = () => {
    // 🔐 clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login
    navigate("/login");

    };

  return (
    <nav className="navbar-custom">
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div>
        <h2>Meeting & Task Planer</h2>
      </div>

      <div 
        className="profile-section"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img 
          src="https://i.pravatar.cc/40" 
          alt="profile" 
          className="profile-img"
        />

        {dropdownOpen && (
          <div className="dropdown-menu-custom">
            <p>Settings</p>
            <button className="dropdown-item text-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
