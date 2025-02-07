import React, { useState, useEffect } from "react";
import Navbar from "./components/organisms/navbar/Navbar";
import Sidebar from "./components/organisms/Sidebar/Sidebar"; 
import Dashboard from "./components/organisms/dashboard/DashBoard"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import "./components/style/Theme.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  useEffect(() => {
    
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
       
        <Navbar toggleTheme={toggleTheme} />
        
        {/* Dashboard Layout with Left and Right Sidebars */}
        {/* <div className="dashboard-layout">
          <Sidebar 
            position="left" 
            isOpen={leftSidebarOpen} 
            toggleSidebar={toggleLeftSidebar} 
          /> */}
          
          {/* Dashboard Content */}
          {/* <div className="dashboard-content">
            <Dashboard />
          </div>

          <Sidebar 
            position="right" 
            isOpen={rightSidebarOpen} 
            toggleSidebar={toggleRightSidebar} 
          />
        </div> */}

       
        <Routes>
          <Route path="/indices" element={<h2>Indices Page</h2>} />
          <Route path="/insider-trades" element={<h2>Insider Trades Page</h2>} />
          <Route path="/fii-dii-data" element={<h2>FII/DII Data Page</h2>} />
          <Route path="/alerts" element={<h2>Alerts Page</h2>} />
          <Route path="/big-players" element={<h2>Big Players Page</h2>} />
          <Route path="/watchlist" element={<h2>Watchlist Page</h2>} />
          <Route path="/ipo-dashboard" element={<h2>IPO Dashboard Page</h2>} />
          <Route path="/" element={<h2>Home Page</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
