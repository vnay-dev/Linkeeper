import { START_LOADER, STOP_LOADER } from "./types";

const initialState = {
  visibility: false,
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADER:
      return {
        visibility: true,
      };
    case STOP_LOADER:
      return {
        visibility: false,
      };
    default:
      return state;
  }
};

export default LoaderReducer;
