import { combineReducers } from "redux";
import BtnReducer from "./Button/reducer";
import ModalReducer from "./Modal/reducer";
import UrlReducer from "./Urls/reducer";
import ErrorReducer from "./Error/reducer";
import BadgeReducer from "./Badges/reducer";
import SearchFilterReducer from "./SearchBar/reducers";

const rootReducer = combineReducers({
  BtnReducer,
  ModalReducer,
  UrlReducer,
  ErrorReducer,
  BadgeReducer,
  SearchFilterReducer,
});

export default rootReducer;
