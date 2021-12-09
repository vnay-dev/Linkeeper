import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  addBadge,
  addNewBadge,
  badgeSelected,
} from "../../redux/Badges/action";

const BadgeContainer = ({ label, onClick, status, onDelete }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);

  const dispatch = useDispatch();

  const unSelectBadge = () => {
    onDelete();
    setDeleteAction(true);
  };

  const addBackBadge = () => {
    setDeleteAction(false);
    setShowDeleteBtn(false);
    // dispatch(addNewBadge(selectedBadge));
    // dispatch(addBadge(selectedBadge));
    // dispatch(badgeSelected(selectedBadge));
  };

  useEffect(() => {
    console.log(label);
  }, [label]);

  return (
    <div className="badgeContainer" onClick={onClick}>
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
            onClick={addBackBadge}
          />
        )
      ) : (
        <CheckCircleOutlineIcon
          className="done-icon"
          onMouseEnter={() => setShowDeleteBtn(true)}
        />
      )}
    </div>
  );
};

export default BadgeContainer;
