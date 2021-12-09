import {
  ADD_BADGE,
  ADD_NEW_BADGE,
  BADGE_SELECTED,
  BADGE_UNSELECTED,
  CLEAR_CURRENT_BADGE_LIST,
  POP_BADGE_FROM_CURRENT,
} from "./types";

const initialState = {
  badges: [], // global list of badges
  currentBadges: [], // current list of badges
  badgeSelectedFlag: false,
};

const BadgeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BADGE: // current list
      return {
        badges: state.badges,
        currentBadges: [...state.currentBadges, action.payload],
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    case ADD_NEW_BADGE: // adding new badge to global list
      return {
        badges: [...state.badges, action.payload],
        currentBadges: state.currentBadges,
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    case BADGE_SELECTED: // selected a badge
      return {
        badges: state.badges,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: true,
      };
    case BADGE_UNSELECTED: // unselected a badge
      return {
        badges: state.badges,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: false,
      };
    case CLEAR_CURRENT_BADGE_LIST:
      return {
        badges: state.badges,
        currentBadges: [],
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    case POP_BADGE_FROM_CURRENT:
      let currentBadgesAfterDeletion = state.currentBadges.filter((item) => {
        return action.payload !== item;
      });
      return {
        badges: state.badges,
        //currentBadges: currentBadgesAfterDeletion,
        currentBadges: state.currentBadges,
        badgeSelectedFlag: state.badgeSelectedFlag,
      };
    default:
      return state;
  }
};

export default BadgeReducer;
