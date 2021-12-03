import { STOP_SEARCH, TRIGGER_SEARCH } from "./types";

export const triggerSearchAction = (data) => {
  return {
    type: TRIGGER_SEARCH,
    payload: data,
  };
};

export const stopSearch = () => {
  return {
    type: STOP_SEARCH,
  };
};
