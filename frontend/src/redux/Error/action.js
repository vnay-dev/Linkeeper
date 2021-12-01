import { SHOW_ERROR_MESSAGE, CLOSE_ERROR_MESSAGE } from "./types";

export const showError = (data) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload: data,
  };
};

export const closeError = () => {
  return {
    type: CLOSE_ERROR_MESSAGE,
  };
};
