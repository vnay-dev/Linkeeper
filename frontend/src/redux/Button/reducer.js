import { BTN_ONCLICK, BTN_CLICK_RESET } from "./types";

const initialState = {
  onClick: false,
};

const BtnReducer = (state = initialState, action) => {
  switch (action.type) {
    case BTN_ONCLICK:
      return {
        onClick: true,
      };
    case BTN_CLICK_RESET:
      return {
        onClick: false,
      };
    default:
      return state;
  }
};

export default BtnReducer;
