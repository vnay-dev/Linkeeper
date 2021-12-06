import React, { useEffect, useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrl, popBadgesFromUrl } from "../../redux/Urls/action";

const UrlCard = ({ url, badges, urlId }) => {
  const dispatch = useDispatch();
  const urlArray = useSelector((state) => state.UrlReducer);

  const [badgeArrEmpty, setBadgeArrayEmpty] = useState(false);
  const [onHover, setOnHover] = useState(false);

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
      <div className="delete-bin-icon">
        <DeleteIcon sx={{ fontSize: 25 }} onClick={removeUrl} />
      </div>
    </div>
  );
};

export default UrlCard;
