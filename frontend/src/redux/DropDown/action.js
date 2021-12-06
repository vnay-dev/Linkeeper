import {
  RESET_TOGGLE_KEYDOWN,
  RESET_TOGGLE_KEYUP,
  TOGGLE_KEYDOWN_SELECT,
  TOGGLE_KEYUP_SELECT,
} from "./types";

export const toggleKeyDown = () => {
  return {
    type: TOGGLE_KEYDOWN_SELECT,
  };
};

export const toggleKeyUp = () => {
  return {
    type: TOGGLE_KEYUP_SELECT,
  };
};

export const resetToggleKeyDown = () => {
  return {
    type: RESET_TOGGLE_KEYDOWN,
  };
};

export const resetToggleKeyUp = (data) => {
  return {
    type: RESET_TOGGLE_KEYUP,
    payload: data,
  };
};
