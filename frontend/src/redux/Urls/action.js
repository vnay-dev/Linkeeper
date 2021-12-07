import {
  ADD_URL,
  DELETE_URL,
  DUPLICATE_URL_CHECK,
  POP_BADGES_FROM_URL,
} from "./types";

export const addUrl = (data) => {
  return {
    type: ADD_URL,
    payload: data,
  };
};

export const deleteUrl = (data) => {
  return {
    type: DELETE_URL,
    payload: data,
  };
};

export const popBadgesFromUrl = (data) => {
  return {
    type: POP_BADGES_FROM_URL,
    payload: data,
  };
};

export const duplicateUrlCheck = (data) => {
  return {
    type: DUPLICATE_URL_CHECK,
    payload: data,
  };
};
