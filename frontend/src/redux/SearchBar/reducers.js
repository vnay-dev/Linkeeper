import { STOP_SEARCH, TRIGGER_SEARCH } from "./types";

const initialState = {
  filteredList: [],
  searchFlag: false,
};

const SearchFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRIGGER_SEARCH:
      const searchText = action.payload.queryText;
      const urlArray = action.payload.badgeArrayList.urls;
      let filteredArray = [];

      if (searchText !== "") {
        urlArray.filter((item) => {
          let tempBadgeArr = item.badges;
          let urlCard = item;
          let resultArr = tempBadgeArr.map((badge) => {
            return badge.includes(searchText);
          });
          return resultArr.forEach((item) => {
            if (item) {
              filteredArray.push(urlCard);
            }
          });
        });
      } else {
        filteredArray = [];
      }

      return {
        searchFlag: true,
        filteredList: filteredArray,
      };

    case STOP_SEARCH:
      return {
        searchFlag: false,
        filteredList: [],
      };
    default:
      return state;
  }
};

export default SearchFilterReducer;
