import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SuggestionBadge = ({ label, onClick }) => {
  return (
    <div className="badgeContainer" onClick={onClick}>
      <span>{label}</span>
      <AddCircleOutlineIcon className="add-icon" />
    </div>
  );
};

export default SuggestionBadge;
