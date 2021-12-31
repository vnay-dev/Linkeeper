import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrl, popBadgesFromUrl } from "../../redux/Urls/action";
import { Card, CardContent, Typography } from "@mui/material";

const UrlCard = ({ url, badges, urlId, title }) => {
  const dispatch = useDispatch();
  const urlArray = useSelector((state) => state.UrlReducer);

  const [badgeArrEmpty, setBadgeArrayEmpty] = useState(false);

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
    <Card>
      <CardContent>
        <Typography>
          <a href={url} target="_blank" rel="noreferrer">
            <span>{title}</span>
          </a>
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default UrlCard;
