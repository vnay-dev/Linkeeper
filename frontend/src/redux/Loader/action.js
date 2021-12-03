import { START_LOADER, STOP_LOADER } from "./types";

export const showLoader = () => {
  return {
    type: START_LOADER,
  };
};

export const stopLoader = () => {
  return {
    type: STOP_LOADER,
  };
};
