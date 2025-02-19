import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./components/style/theme";
import Navbar from "./components/organisms/navbar/Navbar";
import LeftSidebar from "./components/organisms/Sidebar/LeftSidebar";
import RightSidebar from "./components/organisms/Sidebar/RightSidebar";
import Dashboard from "./components/organisms/dashboard/Dashboard";

function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [selectedContent, setSelectedContent] = useState("Market Breath");

  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navbar sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 0 }} />

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            marginTop: "10px",
            height: "calc(100vh - 74px)",
            overflow: "hidden",
          }}
        >
          <LeftSidebar
            open={leftSidebarOpen}
            toggleSidebar={toggleLeftSidebar}
            setSelectedContent={setSelectedContent}
          />

          <Dashboard selectedContent={selectedContent} leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} />
          
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
