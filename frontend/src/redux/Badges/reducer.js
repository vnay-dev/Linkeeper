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

const initialState = {
  badges: [], // global list of badges
  currentBadges: [], // current list of badges
  selectionActivityArray: [], // display array in the badge activity
  badgeSelectedFlag: false,
};

const BadgeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BADGE: // current list
      return {
        badges: [...state.badges, action.payload],
        currentBadges: state.currentBadges,
        selectionActivityArray: state.selectionActivityArray,
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    case ADD_SELECTION_ACTIVITY_ARRAY: // add to selection acitvity array
      return {
        badges: state.badges,
        currentBadges: state.currentBadges,
        selectionActivityArray: [
          ...state.selectionActivityArray,
          action.payload,
        ],
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    case ADD_BADGE_TO_CURRENT_ARRAY: // append to current list alone
      return {
        badges: state.badges,
        currentBadges: [...state.currentBadges, action.payload],
        selectionActivityArray: state.selectionActivityArray,
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    case ADD_NEW_BADGE: // adding new badge to global list
      console.log([...state.badges, action.payload]);
      return {
        badges: [...state.badges, action.payload],
        currentBadges: state.currentBadges,
        badgeSelectedFlag: state.badgeSelectedFlag,
        selectionActivityArray: state.selectionActivityArray,
      };
    case BADGE_SELECTED: // selected a badge
      return {
        badges: state.badges,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: true,
        selectionActivityArray: state.selectionActivityArray,
      };
    case BADGE_UNSELECTED: // unselected a badge
      return {
        badges: state.badges,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: false,
        selectionActivityArray: state.selectionActivityArray,
      };
    case CLEAR_CURRENT_BADGE_LIST:
      return {
        badges: state.badges,
        currentBadges: [],
        badgeSelectedFlag: state.badgeSelectedFlag,
        selectionActivityArray: state.selectionActivityArray,
      };
    case POP_BADGE_FROM_CURRENT:
      let currentBadgesAfterDeletion = state.currentBadges.filter((item) => {
        return action.payload !== item;
      });
      return {
        badges: state.badges,
        currentBadges: currentBadgesAfterDeletion,
        badgeSelectedFlag: state.badgeSelectedFlag,
        selectionActivityArray: state.selectionActivityArray,
      };
    case POP_BADGE_FROM_GLOBAL:
      let globalBadgesAfterDeletion = state.badges.filter((item) => {
        return action.payload !== item;
      });
      return {
        badges: globalBadgesAfterDeletion,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: state.badgeSelectedFlag,
        selectionActivityArray: state.selectionActivityArray,
      };
    case RESET_SELECTION_ACTIVITY_ARRAY:
      return {
        badges: state.badges,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: state.badgeSelectedFlag,
        selectionActivityArray: [],
      };
    default:
      return state;
  }
};

export default BadgeReducer;
