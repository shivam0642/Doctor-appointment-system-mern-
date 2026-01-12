import React from "react";
import { Outlet } from "react-router-dom";
import Menus from "./Menus";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Menus />
        </div>
        <div className="col-md-10">
          <div style={{ minHeight: "80vh" }}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
