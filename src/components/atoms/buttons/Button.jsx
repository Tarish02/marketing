import React from "react";
import "./Button.css";

const Button = ({ label, onClick, variant = "default", size = "medium" }) => {
  return (
    <button className={`button ${variant} ${size}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
