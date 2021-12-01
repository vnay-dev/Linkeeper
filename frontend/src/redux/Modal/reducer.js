import { SHOW_MODAL, CLOSE_MODAL } from "./types";

const initialState = {
  visibility: false,
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        visibility: true,
      };
    case CLOSE_MODAL:
      return {
        visibility: false,
      };
    default:
      return state;
  }
};

export default ModalReducer;
