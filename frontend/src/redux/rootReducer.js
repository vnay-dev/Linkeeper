import { combineReducers } from "redux";
import BtnReducer from "./Button/reducer";
import ModalReducer from "./Modal/reducer";
import UrlReducer from "./Urls/reducer";
import ErrorReducer from "./Error/reducer";
import BadgeReducer from "./Badges/reducer";
import SearchFilterReducer from "./SearchBar/reducer";
import LoaderReducer from "./Loader/reducer";

const rootReducer = combineReducers({
  BtnReducer,
  ModalReducer,
  UrlReducer,
  ErrorReducer,
  BadgeReducer,
  SearchFilterReducer,
  LoaderReducer,
});

export default rootReducer;
