import {
  ADD_URL,
  DELETE_URL,
  DUPLICATE_URL_CHECK,
  POP_BADGES_FROM_URL,
} from "./types";

const initialState = {
  urls: [],
  duplicateUrl: false,
};

const UrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_URL:
      return {
        urls: [action.payload, ...state.urls],
        duplicateUrl: state.duplicateUrl,
      };

    case DELETE_URL:
      const deleteUrlId = action.payload.urlId;
      const newArray = state.urls.filter((item) => {
        return item.itemId !== deleteUrlId;
      });
      return {
        urls: newArray,
        duplicateUrl: state.duplicateUrl,
      };

    case POP_BADGES_FROM_URL:
      let finalArray;
      let urlCard = state.urls.find((item) => {
        return item.itemId === action.payload.urlId;
      });
      let urlArrayAfterDeletion = urlCard.badges.filter((item) => {
        return item !== action.payload.badgeText;
      });
      finalArray = state.urls.filter((item) => {
        if (item.itemId === action.payload.urlId) {
          item.badges = urlArrayAfterDeletion;
        }
        return item;
      });

      return {
        urls: finalArray,
        duplicateUrl: state.duplicateUrl,
      };

    case DUPLICATE_URL_CHECK:
      let duplicateUrl = state.urls.filter((item) => {
        return item.url.includes(action.payload);
      });
      if (duplicateUrl.length) {
        return {
          urls: state.urls,
          duplicateUrl: true,
        };
      } else {
        return {
          urls: state.urls,
          duplicateUrl: false,
        };
      }

    default:
      return state;
  }
};

export default UrlReducer;
