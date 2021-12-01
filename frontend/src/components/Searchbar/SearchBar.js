import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { stopSearch, triggerSearchAction } from "../../redux/SearchBar/actions";

const SearchBar = () => {
  const [queryBadge, setQueryBadge] = useState("");
  const urlArray = useSelector((state) => state.UrlReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (queryBadge) {
      dispatch(
        triggerSearchAction({
          queryText: queryBadge,
          badgeArrayList: urlArray,
        })
      );
    }
  }, [queryBadge]);

  const triggerSearch = (value) => {
    if (value !== "") {
      setQueryBadge(value);
    } else {
      dispatch(stopSearch());
    }
  };

  return (
    <div className="searchbar-container">
      <SearchIcon />
      <input
        onChange={(e) => triggerSearch(e.target.value)}
        className="searchbar"
        placeholder="Search…"
        type="text"
      />
    </div>
  );
};

export default SearchBar;
