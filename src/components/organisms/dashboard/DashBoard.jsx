import React from "react";
import MarketBreathPage from "../../pages/MarketBreathPage";
import HotSectorPage from "../../pages/HotSectorPage";
import SectorStocksPage from "../../pages/SectorStocksPage";
import MyScansPage from "../../pages/MyScansPage";
import RawMaterialPage from "../../pages/RawMaterialPage";
import TechnofundaAnalysisPage from "../../pages/TechnofundaAnalysisPage";

const Dashboard = ({ selectedContent, leftSidebarOpen, rightSidebarOpen, setLeftSidebarOpen, setRightSidebarOpen }) => {
  const renderContent = () => {
    switch (selectedContent) {
      case "Market Breath":
        return <MarketBreathPage />;
      case "Hot Sector":
        return <HotSectorPage />;
      case "Sector Stocks":
        return <SectorStocksPage />;
      case "My Scans":
        return <MyScansPage />;
      case "Raw Material":
        return <RawMaterialPage />;
      case "Technofunda Analysis":
        return <TechnofundaAnalysisPage />;
      default:
        return <MarketBreathPage />;
    }
  };

  // Function to close both sidebars
  const closeBothSidebars = () => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  };

  return (
    <div
      style={{
        flexGrow: 1,
        height: "100%",
        overflowY: "auto",
        transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
        width: leftSidebarOpen && rightSidebarOpen ? "calc(100% - 520px)" : leftSidebarOpen || rightSidebarOpen ? "calc(100% - 280px)" : "calc(100% - 80px)",
        marginLeft: leftSidebarOpen ? "15px" : "-140px",
        marginRight: rightSidebarOpen ? "15px" : "-230px",
        paddingRight: "15px",
      }}
    >
      {renderContent()}
      

    </div>
  );
};

export default Dashboard;