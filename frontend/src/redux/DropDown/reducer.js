import {
  ADD_BADGE_FROM_DROPDOWN,
  RESET_TOGGLE_KEYDOWN,
  RESET_TOGGLE_KEYUP,
  TOGGLE_KEYDOWN_SELECT,
  TOGGLE_KEYUP_SELECT,
  RESET_BADGE_FROM_DROPDOWN,
} from "./types";

const initialState = {
  cursor: 0,
  badgeAddRequest: false,
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
    case ADD_BADGE_FROM_DROPDOWN:
      return {
        badgeAddRequest: true,
      };
    case RESET_BADGE_FROM_DROPDOWN:
      return {
        badgeAddRequest: false,
      };
    default:
      return state;
  }
};

export default DropDownReducer;
