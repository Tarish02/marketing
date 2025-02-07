import React from "react";
import Button from "../../atoms/buttons/Button";
import Tag from "../../atoms/Tag/Tag"; 
import "./Navbar.css";

const Navbar = ({ toggleTheme }) => {
  const navLinks = [
    { label: "Indices", to: "/indices" },
    { label: "Insider Trades", to: "/insider-trades" },
    { label: "FII/DII Data", to: "/fii-dii-data" },
    { label: "Alerts", to: "/alerts" },
    { label: "Big Players", to: "/big-players" },
    { label: "Watchlist", to: "/watchlist" },
    { label: "IPO Dashboard", to: "/ipo-dashboard" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>LOGO</h1>
      </div>

      <ul className="navbar-links">
        {navLinks.map((link, index) => (
          <Tag key={index} label={link.label} to={link.to} />
        ))}
      </ul>

      <div className="navbar-actions">
        <input type="text" placeholder="Search..." className="search-input" />
        <Button label="Login" variant="login" size="medium" />
        <Button label="Sign Up" variant="signup" size="medium" />
      </div>
    </nav>
  );
};

export default Navbar;
