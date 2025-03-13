import React from "react";
import SectorTable from "../organisms/hotsectorpage/Table";
import Charts from "../organisms/hotsectorpage/Charts";
import Drawer from "../organisms/hotsectorpage/Drawer";
import { useDispatch } from "react-redux";
import { setSelectedSector, toggleDrawer } from "../../redux/slices/uiSlice";
import { fetchDrawerData } from "../../redux/slices/drawerSlice";

const HotSector = () => {
  const dispatch = useDispatch();

  const handleSectorClick = (sector) => {
    dispatch(setSelectedSector(sector)); 
    dispatch(fetchDrawerData(sector)); 
    dispatch(toggleDrawer(true)); 
  };

  return (
    <div>
      <SectorTable onSectorClick={handleSectorClick} /> 
      <Charts />
      <Drawer />
    </div>
  );
};

export default HotSector;


