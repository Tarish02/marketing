import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import theme from "./components/style/theme";
import Navbar from "./components/organisms/navbar/Navbar";
import LeftSidebar from "./components/organisms/Sidebar/LeftSidebar";
import RightSidebar from "./components/organisms/Sidebar/RightSidebar";
import Dashboard from "./components/organisms/dashboard/DashBoard";
import Screen6 from "./components/pages/Screen6";

function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [selectedContent, setSelectedContent] = useState("Market Breath");

  const navigate = useNavigate();
  const location = useLocation();

  const toggleLeftSidebar = () => setLeftSidebarOpen((prev) => !prev);
  const toggleRightSidebar = () => setRightSidebarOpen((prev) => !prev);

  // Collapse both sidebars when navigating to "Hot Sector", "Technofunda Analysis", or "Screen6"
  useEffect(() => {
    if (
      selectedContent === "Hot Sector" || 
      selectedContent === "Technofunda Analysis" || 
      location.pathname.startsWith("/screen6")
    ) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  }, [selectedContent, location.pathname]);

  const handleContentSelection = (content, stockSymbol = null) => {
    setSelectedContent(content);

    if (stockSymbol) {
      navigate(`/screen6/${stockSymbol}`);
    } else if (content !== "Screen6") {
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navbar sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10 }} />

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            marginTop: "64px",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
          <LeftSidebar
            open={leftSidebarOpen}
            toggleSidebar={toggleLeftSidebar}
            setSelectedContent={handleContentSelection}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  selectedContent={selectedContent}
                  leftSidebarOpen={leftSidebarOpen}
                  rightSidebarOpen={rightSidebarOpen}
                  setLeftSidebarOpen={setLeftSidebarOpen}
                  setRightSidebarOpen={setRightSidebarOpen}
                />
              }
            />
            <Route path="/screen6/:stockSymbol" element={<Screen6 />} />
          </Routes>

          <RightSidebar open={rightSidebarOpen} toggleSidebar={toggleRightSidebar} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;






















// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
// import theme from "./components/style/Theme";
// import Navbar from "./components/organisms/navbar/Navbar";
// import Dashboard from "./components/organisms/dashboard/Dashboard";
// import Indices from "./components/pages/Indices";
// import InsiderTrades from "./components/pages/InsiderTrades";
// import FIIDIIData from "./components/pages/FIIDIIData";
// import Alerts from "./components/pages/Alerts";
// import BigPlayers from "./components/pages/BigPlayers";
// import Watchlist from "./components/pages/Watchlist";
// import IPODashboard from "./components/pages/IPODashboard";

// function App() {
//   const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Navbar />
//         <Box display="flex">
//           <Dashboard
//             isLeftSidebarOpen={isLeftSidebarOpen}
//             isRightSidebarOpen={isRightSidebarOpen}
//             setIsLeftSidebarOpen={setIsLeftSidebarOpen}
//             setIsRightSidebarOpen={setIsRightSidebarOpen}
//           />
//         </Box>
//         <Container style={{ padding: "20px" }}>
//           <Routes>
//             <Route path="/" element={<h1>Welcome to My App</h1>} />
//             <Route path="/indices" element={<Indices />} />
//             <Route path="/insider-trades" element={<InsiderTrades />} />
//             <Route path="/fii-dii-data" element={<FIIDIIData />} />
//             <Route path="/alerts" element={<Alerts />} />
//             <Route path="/big-players" element={<BigPlayers />} />
//             <Route path="/watchlist" element={<Watchlist />} />
//             <Route path="/ipo-dashboard" element={<IPODashboard />} />
//           </Routes>
//         </Container>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
