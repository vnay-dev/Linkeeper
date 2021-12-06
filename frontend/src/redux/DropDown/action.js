import {
  ADD_BADGE_FROM_DROPDOWN,
  RESET_BADGE_FROM_DROPDOWN,
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

export const addBadgeFromDropDown = () => {
  return {
    type: ADD_BADGE_FROM_DROPDOWN,
  };
};

export const resetAddBadgeFromDropDown = () => {
  return {
    type: RESET_BADGE_FROM_DROPDOWN,
  };
};
