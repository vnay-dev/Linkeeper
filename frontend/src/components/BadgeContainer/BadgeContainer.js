import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  addBadge,
  addNewBadge,
  badgeSelected,
  removeBadgeFromCurrent,
  removeBadgeFromGlobal,
} from "../../redux/Badges/action";
import {
  addSelectionAcivityArray,
  popBadgesFromUrl,
} from "../../redux/Urls/action";

const BadgeContainer = ({ label, onClick, status, onDelete, urlId }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);

  const dispatch = useDispatch();
  const parentContainer = useRef();

  const unSelectBadge = () => {
    onDelete();
    setDeleteAction(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    // dispatch(removeBadgeFromGlobal(selectedBadge));
    //dispatch(popBadgesFromUrl({ badgeText: selectedBadge, urlId: urlId }));
  };

  const addBackBadge = (e) => {
    setDeleteAction(false);
    setShowDeleteBtn(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    // dispatch(addNewBadge(selectedBadge));
    dispatch(addBadge(selectedBadge));
    // dispatch(badgeSelected(selectedBadge));
    // dispatch(addSelectionAcivityArray(selectedBadge));
  };

  // const removeBadge = (e) => {
  //   let selectedBadge = parentContainer.current.children[0].textContent;
  //   console.log(selectedBadge);
  //   dispatch(removeBadgeFromCurrent(selectedBadge));
  //   dispatch(removeBadgeFromGlobal(selectedBadge));
  // };

  return (
    <div className="badgeContainer" ref={parentContainer} onClick={onClick}>
      <span>{label}</span>
      {status === "add" ? (
        <AddCircleOutlineIcon className="add-icon" />
      ) : showDeleteBtn ? (
        !deleteAction ? (
          <HighlightOffIcon
            className="clear-icon"
            //className={deleteAction ? "rotateIcon clear-icon" : "clear-icon"}
            onMouseLeave={() => setShowDeleteBtn(false)}
            //onClick={onDelete}
            onClick={unSelectBadge}
          />
        ) : (
          <AddCircleOutlineIcon
            //className="add-icon"
            className={deleteAction ? "rotateIcon add-icon" : "add-icon"}
            onClick={(e) => addBackBadge(e)}
          />
        )
      ) : (
        <CheckCircleOutlineIcon
          className="done-icon"
          onMouseEnter={() => setShowDeleteBtn(true)}
          // onClick={(e) => removeBadge(e)}
        />
      )}
    </div>
  );
};

export default BadgeContainer;
