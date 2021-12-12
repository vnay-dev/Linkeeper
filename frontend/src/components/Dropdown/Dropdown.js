import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBadge,
  addSelectionActivityArray,
  badgeSelected,
} from "../../redux/Badges/action";
import { resetAddBadgeFromDropDown } from "../../redux/DropDown/action";
import { showError } from "../../redux/Error/action";

const Dropdown = ({ listArray }) => {
  const dispatch = useDispatch();
  const selectedBadge = useRef();
  const badgeStoreArray = useSelector((state) => state.BadgeReducer);
  const dropDownToggle = useSelector((state) => state.DropDownReducer);

  const showDuplicateBadgeError = () => {
    dispatch(showError({ type: "error", message: "Badge already added!" }));
  };

  const addItem = (selectedBadge) => {
    let itemFound = badgeStoreArray.currentBadges.find((item) => {
      return item.match(selectedBadge);
    });

    if (!!itemFound) {
      showDuplicateBadgeError();
    } else {
      dispatch(addBadge(selectedBadge));
      dispatch(addSelectionActivityArray(selectedBadge));
      dispatch(badgeSelected(selectedBadge));
    }
    dispatch(resetAddBadgeFromDropDown());
  };

  useEffect(() => {
    let badgePicked;
    if (dropDownToggle.badgeAddRequest) {
      badgePicked = Object.values(selectedBadge.current.children).filter(
        (item) => {
          return item.className === "addHighLightItem";
        }
      );
    }
    if (badgePicked) {
      addItem(badgePicked[0].textContent);
    }
  }, [dropDownToggle]);

  return (
    <div className="dropdown" ref={selectedBadge}>
      {listArray.map((item, index) => {
        return (
          <span
            key={index}
            className={
              dropDownToggle.cursor === index
                ? "addHighLightItem"
                : "removeHighLightItem"
            }
            onClick={(item) => addItem(item.target.textContent)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Dropdown;
