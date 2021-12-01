import { ADD_URL, DELETE_URL, POP_BADGES_FROM_URL } from "./types";

const initialState = {
  urls: [],
};

const UrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_URL:
      return {
        urls: [...state.urls, action.payload],  
      };
    case DELETE_URL:
      const deleteUrlId = action.payload.urlId;
      const newArray = state.urls.filter((item) => {
        return item.itemId !== deleteUrlId;
      });
      return {
        urls: newArray,
      };
    case POP_BADGES_FROM_URL:
      let urlCard = state.urls.find((item) => {
        return item.itemId === action.payload.urlId;
      });
      let urlArrayAfterDeletion = urlCard.badges.filter((item) => {
        return item !== action.payload.badgeText;
      });
      let finalArray = state.urls.filter((item) => {
        if (item.itemId === action.payload.urlId) {
          item.badges = urlArrayAfterDeletion;
        }
        return item;
      });
      return {
        urls: finalArray,
      };
    default:
      return state;
  }
};

export default UrlReducer;
