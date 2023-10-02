import React from "react";
import Auth from "./Auth";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="flex">
      <Auth />
      <Outlet />
    </div>
  );
};

export default MainContainer;
