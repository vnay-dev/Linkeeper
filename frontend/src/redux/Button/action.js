import { BTN_CLICK_RESET, BTN_ONCLICK } from "./types";

export const btnOnClick = () => {
  return {
    type: BTN_ONCLICK,
  };
};

export const btnReset = () => {
  return {
    type: BTN_CLICK_RESET,
  };
};


