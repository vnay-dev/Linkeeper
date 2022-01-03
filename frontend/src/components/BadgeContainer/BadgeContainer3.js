import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  addBadge,
  removeBadgeFromCurrent,
  removeBadgeFromGlobal,
} from "../../redux/Badges/action";

const BadgeContainer = ({
  label,
  status,
  onClick,
  setDoneIconState,
  setClearIconState,
  setAddIconState,
}) => {
  //   const [doneIconState, setDoneIconState] = useState(false);
  //   const [clearIconState, setClearIconState] = useState(false);
  //   const [addIconState, setAddIconState] = useState(false);

  const showDoneIcon = () => {
    return <CheckCircleOutlineIcon className="done-icon" />;
  };

  const showAddIcon = () => {
    return <AddCircleOutlineIcon className="add-icon" />;
  };

  return (
    <div className="badgeContainer" onClick={onClick}>
      <span>{label}</span>
      {status ? showAddIcon() : showDoneIcon()}
      {setDoneIconState && <CheckCircleOutlineIcon className="done-icon" />}
      {setClearIconState && <HighlightOffIcon className="clear-icon" />}
      {setAddIconState && <AddCircleOutlineIcon className="add-icon" />}
    </div>
  );
};

export default BadgeContainer;
