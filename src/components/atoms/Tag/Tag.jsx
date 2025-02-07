import React from "react";
import { Link } from "react-router-dom";
import "./Tag.css"; 

const Tag = ({ label, to }) => {
  return (
    <li className="nav-tag">
      <Link to={to}>{label}</Link>
    </li>
  );
};

export default Tag;
