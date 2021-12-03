import React, { useEffect, useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrl, popBadgesFromUrl } from "../../redux/Urls/action";

const UrlCard = ({ url, badges, urlId }) => {
  const dispatch = useDispatch();
  const urlArray = useSelector((state) => state.UrlReducer);

  const [badgeArrEmpty, setBadgeArrayEmpty] = useState(false);

  const deleteBinIcon = useRef();

  const checkBadgeArrayEmpty = (id) => {
    urlArray.urls.filter((item) => {
      if (item.badges.length === 0) {
        setBadgeArrayEmpty(true);
      }
    });
  };

  const handleDelete = (badge) => {
    dispatch(popBadgesFromUrl(badge));
    checkBadgeArrayEmpty(badge.urlId);
  };

  const removeUrl = () => {
    dispatch(
      deleteUrl({
        urlId: urlId,
      })
    );
  };

  useEffect(() => {
    if (badgeArrEmpty) {
      removeUrl();
    }
  }, [badgeArrEmpty]);

  useEffect(() => {
    deleteBinIcon.current.style.visibility = "hidden";
  }, [deleteBinIcon]);

  const showBinIcon = () => {
    deleteBinIcon.current.style.visibility = "visible";
  };

  const hideBinIcon = () => {
    deleteBinIcon.current.style.visibility = "hidden";
  };

  return (
    <div className="urlCard">
      <span>{url}</span>
      <div className="url-badges">
        {badges.length
          ? badges.map((item, index) => {
              let badgeToDelete = {
                badgeText: item,
                urlId: urlId,
              };
              return (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => handleDelete(badgeToDelete)}
                />
              );
            })
          : null}
      </div>
      <div
        className="delete-bin-icon"
        onMouseEnter={showBinIcon}
        onMouseLeave={hideBinIcon}
      >
        <DeleteIcon
          ref={deleteBinIcon}
          sx={{ fontSize: 25 }}
          className="delete-modal-button"
          onClick={removeUrl}
        />
      </div>
    </div>
  );
};

export default UrlCard;
