import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SuggestionBadge = ({ label, onClick }) => {
  const showAddIcon = () => {
    return <AddCircleOutlineIcon className="add-icon" />;
  };

  return (
    <div className="badgeContainer" onClick={onClick}>
      <span>{label}</span>
      {showAddIcon()}
    </div>
  );
};

export default SuggestionBadge;
