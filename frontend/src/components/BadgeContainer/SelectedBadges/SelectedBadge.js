import React, { useRef, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  addBadge,
  addBadgeToCurrent,
  addSelectionActivityArray,
  badgeSelected,
  removeBadgeFromCurrent,
  removeBadgeFromGlobal,
} from "../../../redux/Badges/action";
import { useWindowDimensions } from "../../utils";
import { closeError } from "../../../redux/Error/action";

const SelectedBadge = ({ label, status, onClick, onDelete }) => {
  const [doneState, setDoneState] = useState(false);
  const [clearState, setClearState] = useState(false);
  const [addState, setAddState] = useState(false);

  const [doneStateDesktop, setDoneStateDesktop] = useState(false);
  const [clearStateDesktop, setClearStateDesktop] = useState(false);
  const [toggleClearDesktop, setToggleClearDesktop] = useState(false);
  const [doneActionToggle, setDoneActionToggle] = useState(false);

  const parentContainer = useRef();
  const dispatch = useDispatch();

  const showDoneIcon = () => {
    return <CheckCircleOutlineIcon className="done-icon" />;
  };

  const showAddIcon = () => {
    return <HighlightOffIcon className="rotateIcon" />;
  };

  const showClearIcon = () => {
    return <HighlightOffIcon className="clear-icon" />;
  };

  const { width } = useWindowDimensions();

  const unSelectBadge = () => {
    onDelete();
    setDoneStateDesktop(true);
    setClearStateDesktop(false);
    setToggleClearDesktop(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    setDoneStateDesktop(false);
    setToggleClearDesktop(false);
    setClearStateDesktop(true);
    setDoneActionToggle(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(addBadge(selectedBadge));
    dispatch(addBadgeToCurrent(selectedBadge));
    dispatch(badgeSelected(selectedBadge));
    dispatch(closeError());
  };

  const clickTrigger = () => {
    if (width < 1280) {
      if (!doneState) {
        unSelectBadge();
        setDoneState(true);
        setClearState(true);
        setAddState(false);
      } else if (clearState) {
        setClearState(false);
        setAddState(true);
        setDoneState(true);
      } else if (addState) {
        addBackBadge();
        setAddState(false);
        setClearState(false);
        setDoneState(false);
      }
    }
  };

  const showClearIconDesktop = () => {
    return toggleClearDesktop ? null : clearStateDesktop ? (
      <HighlightOffIcon
        className="clear-icon"
        onMouseLeave={() => toggleHoverState(true)}
        onClick={unSelectBadge}
      />
    ) : (
      <HighlightOffIcon className="rotateIcon" onClick={addBackBadge} />
    );
  };

  const toggleHoverState = (flag) => {
    if (!doneActionToggle) {
      if (flag) {
        setDoneStateDesktop(false);
      } else {
        setDoneStateDesktop(true);
      }
    }
    setClearStateDesktop(true);
    setToggleClearDesktop(false);
    setDoneActionToggle(false);
  };

  const showDoneIconDesktop = () => {
    return !doneStateDesktop ? (
      <CheckCircleOutlineIcon
        className="done-icon"
        onMouseEnter={() => toggleHoverState(false)}
      />
    ) : null;
  };

  return status ? (
    <div
      className="badgeContainer"
      ref={parentContainer}
      onClick={onClick && clickTrigger}
    >
      <span>{label}</span>
      {!doneState && showDoneIcon()}
      {clearState && showClearIcon()}
      {addState && showAddIcon()}
    </div>
  ) : (
    <div className="badgeContainer" ref={parentContainer} onClick={onClick}>
      <span>{label}</span>
      {!status && showDoneIconDesktop()}
      {doneStateDesktop && showClearIconDesktop()}
    </div>
  );
};

export default SelectedBadge;
