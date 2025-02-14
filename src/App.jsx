import React from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./components/style/theme";
import Navbar from "./components/organisms/navbar/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container style={{ padding: "20px" }}>
        
      </Container>
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
