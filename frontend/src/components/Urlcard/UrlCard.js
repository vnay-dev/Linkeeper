import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrl, popBadgesFromUrl } from "../../redux/Urls/action";
import { useWindowDimensions } from "../utils";
import useLongPress from "./utils";

const UrlCard = ({ url, badges, urlId, title }) => {
  const dispatch = useDispatch();
  const urlArray = useSelector((state) => state.UrlReducer);

  const [badgeArrEmpty, setBadgeArrayEmpty] = useState(false);
  const [highlightUrlCard, setHighlightUrlCard] = useState(false);

  const checkBadgeArrayEmpty = () => {
    urlArray.urls.filter((item) => {
      // if (item.badges.length === 0) {
      //   setBadgeArrayEmpty(true);
      // }
      return item.badges.length === 0 ? setBadgeArrayEmpty(true) : null;
    });
  };

  const handleDelete = (badge) => {
    dispatch(popBadgesFromUrl(badge));
    checkBadgeArrayEmpty();
  };

  const removeUrl = () => {
    dispatch(
      deleteUrl({
        urlId: urlId,
      })
    );
    if (highlightUrlCard) {
      setHighlightUrlCard(false);
    }
  };

  const longPressTrigger = () => {
    setHighlightUrlCard(true);
    setTimeout(() => {
      removeUrl();
    }, 500);
  };

  const { width } = useWindowDimensions();

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(longPressTrigger, defaultOptions);

  useEffect(() => {
    if (badgeArrEmpty) {
      removeUrl();
    }
  }, [badgeArrEmpty]);

  return (
    <div
      className={`${"urlCard"} ${highlightUrlCard ? "urlCard-highlight" : ""}`}
      {...(width < 1024 ? longPressEvent : null)}
    >
      <a href={url} target="_blank" rel="noreferrer">
        <span className="urlCard-title">{title}</span>
      </a>
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
      {width > 1024 && (
        <div className="delete-bin-icon">
          <DeleteIcon sx={{ fontSize: 25 }} onClick={removeUrl} />
        </div>
      )}
    </div>
  );
};

export default UrlCard;
