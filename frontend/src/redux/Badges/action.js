import {
  ADD_BADGE,
  ADD_NEW_BADGE,
  BADGE_SELECTED,
  BADGE_UNSELECTED,
  CLEAR_CURRENT_BADGE_LIST,
  POP_BADGE_FROM_CURRENT,
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
