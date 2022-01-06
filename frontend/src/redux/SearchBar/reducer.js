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
        filteredArray = urlArray.filter((item) => {
          let urlCard = item;
          let tempBadgeArr = item.badges;
          let resultArr = tempBadgeArr.filter((item) =>
            item.toLowerCase().includes(searchText.toLowerCase())
          );
          return resultArr.length ? urlCard : null;
        });
      }
      console.log('helo')
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
