import React from "react";
import Button from "../Button";
import SearchBar from "../Searchbar";
import { useDispatch } from "react-redux";
import { btnOnClick } from "../../redux/Button/action";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const NavBar = () => {
  const dispatch = useDispatch();

  const buttonOnClick = () => {
    dispatch(btnOnClick());
  };

  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
          <Button btnText={"Add URL"} onClick={buttonOnClick} />
          <SearchBar />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
