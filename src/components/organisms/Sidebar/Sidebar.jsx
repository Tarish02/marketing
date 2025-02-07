import React from "react";
import Button from "../../atoms/Button"; 

const Sidebar = ({ position, isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${position} ${isOpen ? "open" : "closed"}`}>
      <Button onClick={toggleSidebar} className="toggle-btn">
        {isOpen ? "❌" : position === "left" ? "➡️" : "⬅️"}
      </Button>

      {isOpen && (
        <div className="sidebar-content">
         
          {position === "left" ? (
            <div>
              <p>Left Sidebar Content</p>
            </div>
          ) : (
            <div>
              <p>Right Sidebar Content</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
