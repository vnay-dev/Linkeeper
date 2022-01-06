import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../SearchBar";

const NavBar = () => {
  return (
    <div className="navbar">
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <SearchBar />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
