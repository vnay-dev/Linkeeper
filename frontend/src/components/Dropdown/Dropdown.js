import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBadge, badgeSelected } from "../../redux/Badges/action";
import { showError } from "../../redux/Error/action";

const Dropdown = ({ listArray }) => {
  const dispatch = useDispatch();
  const badgeStoreArray = useSelector((state) => state.BadgeReducer);
  const dropDrownToggle = useSelector((state) => state.DropDownReducer);

  const showDuplicateBadgeError = () => {
    dispatch(showError({ type: "error", message: "Badge already added!" }));
  };

  const addItem = (selectedBadge) => {
    let itemFound = badgeStoreArray.currentBadges.find((item) => {
      return item.match(selectedBadge.target.textContent);
    });

    if (!!itemFound) {
      showDuplicateBadgeError();
    } else {
      dispatch(addBadge(selectedBadge.target.textContent));
      dispatch(badgeSelected(selectedBadge.target.textContent));
    }
  };

  return (
    <div className="dropdown">
      {listArray.map((item, index) => {
        return (
          <span
            key={index}
            //className="list-item"
            className={
              dropDrownToggle.cursor === index
                ? "addHighLightItem"
                : "removeHighLightItem"
            }
            onClick={(item) => addItem(item)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Dropdown;
