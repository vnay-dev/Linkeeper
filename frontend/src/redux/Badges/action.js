import {
  ADD_BADGE,
  ADD_BADGE_TO_CURRENT_ARRAY,
  ADD_NEW_BADGE,
  ADD_SELECTION_ACTIVITY_ARRAY,
  BADGE_SELECTED,
  BADGE_UNSELECTED,
  CLEAR_CURRENT_BADGE_LIST,
  POP_BADGE_FROM_CURRENT,
  POP_BADGE_FROM_GLOBAL,
  RESET_SELECTION_ACTIVITY_ARRAY,
} from "./types";

export const addBadge = (data) => {
  return {
    type: ADD_BADGE,
    payload: data,
  };
};

export const addNewBadge = (data) => {
  return {
    type: ADD_NEW_BADGE,
    payload: data,
  };
};

export const addBadgeToCurrent = (data) => {
  return {
    type: ADD_BADGE_TO_CURRENT_ARRAY,
    payload: data,
  };
};

export const removeBadgeFromCurrent = (data) => {
  return {
    type: POP_BADGE_FROM_CURRENT,
    payload: data,
  };
};

export const badgeSelected = (data) => {
  return {
    type: BADGE_SELECTED,
    payload: data,
  };
};

export const badgeUnselected = () => {
  return {
    type: BADGE_UNSELECTED,
  };
};

export const clearCurrentBadgeList = () => {
  return {
    type: CLEAR_CURRENT_BADGE_LIST,
  };
};

export const removeBadgeFromGlobal = (data) => {
  return {
    type: POP_BADGE_FROM_GLOBAL,
    payload: data,
  };
};

export const resetSelectionActivityArray = () => {
  return {
    type: RESET_SELECTION_ACTIVITY_ARRAY,
  };
};

export const addSelectionActivityArray = (data) => {
  return {
    type: ADD_SELECTION_ACTIVITY_ARRAY,
    payload: data,
  };
};
