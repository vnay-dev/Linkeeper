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

const BadgeContainer = ({ label, onClick, status, onDelete }) => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  const dispatch = useDispatch();
  const parentContainer = useRef();

  const unSelectBadge = () => {
    onDelete();
    setState1(true);
    setState2(false);
    setState3(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    setState1(false);
    setState3(false);
    setState2(true);
    setState4(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(addBadge(selectedBadge));
  };

  const showAddIcon = () => {
    return <AddCircleOutlineIcon className="add-icon" />;
  };

  const toggleHoverState = (flag) => {
    if (!state4) {
      if (flag) {
        setState1(false);
      } else {
        setState1(true);
      }
    }
    setState2(true);
    setState3(false);
    setState4(false);
  };

  const showClearIcon = () => {
    return state3 ? null : state2 ? (
      <HighlightOffIcon
        className="clear-icon"
        onMouseLeave={() => toggleHoverState(true)}
        onClick={unSelectBadge}
      />
    ) : (
      <HighlightOffIcon className="rotateIcon" onClick={addBackBadge} />
    );
  };

  const showDoneIcon = () => {
    return !state1 ? (
      <CheckCircleOutlineIcon
        className="done-icon"
        onMouseEnter={() => toggleHoverState(false)}
      />
    ) : null;
  };

  return (
    <div className="badgeContainer" ref={parentContainer} onClick={onClick}>
      <span>{label}</span>
      {status ? showAddIcon() : showDoneIcon()}
      {state1 && showClearIcon()}
    </div>
  );
};

export default BadgeContainer;
