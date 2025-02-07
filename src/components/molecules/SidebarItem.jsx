import React from "react";
import Button from "../atoms/Button";

const SidebarItem = ({ label, onClick }) => {
  return <Button onClick={onClick} className="sidebar-item">{label}</Button>;
};

export default SidebarItem;
