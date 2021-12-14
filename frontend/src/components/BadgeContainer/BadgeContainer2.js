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
  const [doneState, setDoneState] = useState(false);
  const [clearState, setClearState] = useState(false);
  const [toggleClear, setToggleClear] = useState(false);
  const [state4, setState4] = useState(false);

  const dispatch = useDispatch();
  const parentContainer = useRef();

  const unSelectBadge = () => {
    onDelete();
    setDoneState(true);
    setClearState(false);
    setToggleClear(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    setDoneState(false);
    setToggleClear(false);
    setClearState(true);
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
        setDoneState(false);
      } else {
        setDoneState(true);
      }
    }
    setClearState(true);
    setToggleClear(false);
    setState4(false);
  };

  const showClearIcon = () => {
    return toggleClear ? null : clearState ? (
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
    return !doneState ? (
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
      {doneState && showClearIcon()}
    </div>
  );
};

export default BadgeContainer;
