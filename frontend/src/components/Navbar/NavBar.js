import React from "react";
import Button from "../Button";
import SearchBar from "../Searchbar";
import { useDispatch } from "react-redux";
import { btnOnClick } from "../../redux/Button/action";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      //transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "50ch",
        // "&:focus": {
        //   width: "20ch",
        // },
      },
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(15),
    //   width: "auto",
    // },
    // [theme.breakpoints.up("md")]: {
    //   //marginLeft: theme.spacing(45),
    //   //width: "auto",
    // },
  }));
  const dispatch = useDispatch();

  const buttonOnClick = () => {
    dispatch(btnOnClick());
  };

  return (
    // <div className="navbar">
    //   <AppBar position="static">
    //     <Toolbar>
    //       {/* <Button btnText={"Add URL"} onClick={buttonOnClick} /> */}
    //       <SearchBar />
    //     </Toolbar>
    //   </AppBar>
    // </div>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
