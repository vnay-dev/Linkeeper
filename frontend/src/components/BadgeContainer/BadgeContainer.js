import React, { useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  addBadge,
  removeBadgeFromCurrent,
  removeBadgeFromGlobal,
} from "../../redux/Badges/action";

const BadgeContainer = ({ label, onClick, status, onDelete, urlId }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const parentContainer = useRef();

  const check = () => {
    if (flag) {
      setShowDeleteBtn(false);
    } else {
      setShowDeleteBtn(true);
    }
  };

  const unSelectBadge = () => {
    onDelete();
    setDeleteAction(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    setFlag(true);
    setShowDeleteBtn(false);
    setDeleteAction(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(addBadge(selectedBadge));
  };

  const showClearIcon = () => {
    console.log("clear");
    return (
      <HighlightOffIcon
        className="clear-icon"
        onMouseLeave={() => setShowDeleteBtn(false)}
        onClick={unSelectBadge}
      />
    );
  };

  const showAddIcon = (flag) => {
    return flag === "add" ? (
      <AddCircleOutlineIcon className="add-icon" />
    ) : (
      <AddCircleOutlineIcon
        className={deleteAction ? "rotateIcon add-icon" : "add-icon"}
        onClick={addBackBadge}
      />
    );
  };

  const showDoneIcon = () => {
    console.log("done");
    return (
      <CheckCircleOutlineIcon
        className="done-icon"
        //onMouseEnter={() => setShowDeleteBtn(true)}
        onMouseEnter={check}
      />
    );
  };

  return (
    <div className="badgeContainer" ref={parentContainer} onClick={onClick}>
      <span>{label}</span>
      {status === "add"
        ? showAddIcon("add")
        : showDeleteBtn
        ? deleteAction
          ? showAddIcon("none")
          : showClearIcon()
        : showDoneIcon()}
    </div>
  );
};

export default BadgeContainer;
