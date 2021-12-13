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

const BadgeContainer = ({ label, onClick, status, onDelete, urlId }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [option, setOption] = useState(false);

  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  const dispatch = useDispatch();
  const parentContainer = useRef();
  const doneIconContainer = useRef();

  const unSelectBadge = () => {
    onDelete();
    //setRotate(true);
    setState1(true);
    setState2(false);
    // setState3(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    // setShowDeleteBtn(false);
    // setRotate(false);
    setState2(true);
    setState1(false);
    setState3(true);
    //setDeleteAction(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(addBadge(selectedBadge));
    //setOption(true);
  };

  // const showAddIcon = (flag) => {
  //   return !state3 ? (
  //     <AddCircleOutlineIcon className="add-icon" />
  //   ) : (
  //     <AddCircleOutlineIcon
  //       className={state3 ? "rotateIcon add-icon" : "add-icon"}
  //       onClick={addBackBadge}
  //     />
  //   );
  // };

  const showAddIcon = () => {
    return <AddCircleOutlineIcon className="add-icon" />;
  };

  const bingo = (flag) => {
    if (flag) {
      setState1(false);
      setState2(true);
    } else {
      setState1(true);
      setState2(true);
    }
    setState3(false)
  };

  // const showClearIcon = (flag) => {
  //   return state2 ? (
  //     <HighlightOffIcon
  //       className="clear-icon"
  //       //onMouseLeave={() => setShowDeleteBtn(false)}
  //       //onMouseLeave={() => setState2(false)}
  //       onMouseLeave={() => bingo(true)}
  //       onClick={unSelectBadge}
  //     />
  //   ) : null;
  // };

  const showClearIcon = () => {
    return state3 ? null : state2 ? (
      <HighlightOffIcon
        className="clear-icon"
        //onMouseLeave={() => setShowDeleteBtn(false)}
        //onMouseLeave={() => setState2(false)}
        onMouseLeave={() => bingo(true)}
        onClick={unSelectBadge}
      />
    ) : (
      <HighlightOffIcon
        className="rotateIcon clear-icon"
        //onMouseLeave={() => bingo(true)}
        //onClick={unSelectBadge}
        onClick={addBackBadge}
      />
    );
  };

  const showDoneIcon = () => {
    return !state1 ? (
      <CheckCircleOutlineIcon
        className="done-icon"
        //onMouseEnter={() => setShowDeleteBtn(true)}
        //onMouseEnter={() => setState2(true)}
        onMouseEnter={() => bingo(false)}
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
