import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { WiDaySunny } from "react-icons/wi";  

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <WiDaySunny size={32} className="logo-icon" />
        <h2 className="logo">Weather App</h2>
      </div>
      <div className="nav-links">
        <Link className="link" to="/">Home</Link>
          <Link className="link" to="/about">About</Link>
        <Link className="link" to="/history">History</Link>
      
      </div>
    </nav>
  );
};
export default Navbar;
