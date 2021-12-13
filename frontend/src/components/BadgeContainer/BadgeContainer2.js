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
    setState3(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    // setShowDeleteBtn(false);
    // setRotate(false);
    setState2(false);
    setState1(true);
    //setDeleteAction(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(addBadge(selectedBadge));
    //setOption(true);
  };

  const showClearIcon = (flag) => {
    return flag ? (
      <HighlightOffIcon
        className="clear-icon"
        //onMouseLeave={() => setShowDeleteBtn(false)}
        onMouseLeave={() => setState2(false)}
        onClick={unSelectBadge}
      />
    ) : null;
  };

  const showAddIcon = (flag) => {
    return flag ? (
      <AddCircleOutlineIcon className="add-icon" />
    ) : (
      <AddCircleOutlineIcon
        className={rotate ? "rotateIcon add-icon" : "add-icon"}
        onClick={addBackBadge}
      />
    );
  };

  const showDoneIcon = (flag) => {
    return flag ? (
      <CheckCircleOutlineIcon
        className="done-icon"
        //onMouseEnter={() => setShowDeleteBtn(true)}
        onMouseEnter={() => setState2(true)}
      />
    ) : null;
  };

  // const checker = () => {
  //   if (status) {
  //     return showAddIcon(true);
  //   } else {
  //     if (showDeleteBtn) {
  //       if (rotate) {
  //         return showAddIcon(false);
  //       }
  //       return showClearIcon(true);
  //     } else {
  //       return showDoneIcon(true);
  //     }
  //   }
  // };

  const checker = () => {
    if (status) {
      return showAddIcon(true);
    } else {
      if (!state1) {
        if (state2) {
          if (state3) {
            return showAddIcon(false);
          }
          return showClearIcon(true);
        }
        return showDoneIcon(true);
      } else {
        if(state3){
          return showDoneIcon(true)
        }
        return showDoneIcon(false);
      }
    }
  };

  return (
    <div className="badgeContainer" ref={parentContainer} onClick={onClick}>
      <span>{label}</span>
      {checker()}
    </div>
  );
};

export default BadgeContainer;
