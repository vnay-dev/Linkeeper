import {
  RESET_TOGGLE_KEYDOWN,
  RESET_TOGGLE_KEYUP,
  TOGGLE_KEYDOWN_SELECT,
  TOGGLE_KEYUP_SELECT,
} from "./types";

const initialState = {
  cursor: 0,
};

const DropDownReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_KEYDOWN_SELECT:
      return {
        cursor: state.cursor + 1,
      };
    case TOGGLE_KEYUP_SELECT:
      return {
        cursor: state.cursor - 1,
      };
    case RESET_TOGGLE_KEYDOWN:
      return {
        cursor: 0,
      };
    case RESET_TOGGLE_KEYUP:
      return {
        cursor: action.payload,
      };

    default:
      return state;
  }
};

export default DropDownReducer;
