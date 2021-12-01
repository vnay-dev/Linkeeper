import { SHOW_ERROR_MESSAGE, CLOSE_ERROR_MESSAGE } from "./types";

const initialState = {
  visibility: false,
  error: {
    type: "",
    message: "",
  },
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR_MESSAGE:
      return {
        visibility: true,
        error: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case CLOSE_ERROR_MESSAGE:
      return {
        visibility: false,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
