import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/Modal/action";
import { closeError, showError } from "../../redux/Error/action";
import { addUrl } from "../../redux/Urls/action";

import Chip from "@mui/material/Chip";
import ClearIcon from "@mui/icons-material/Clear";
import {
  addBadge,
  addNewBadge,
  badgeSelected,
  badgeUnselected,
  clearCurrentBadgeList,
  removeBadgeFromCurrent,
} from "../../redux/Badges/action";
import Dropdown from "../Dropdown";
import axios from "axios";
import validUrl from "valid-url";
import AddIcon from "@mui/icons-material/Add";

const Modal = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.ModalReducer);
  const badgeStoreArray = useSelector((state) => state.BadgeReducer);
  //const errorState = useSelector((state) => state.ErrorReducer);

  const [urlText, setUrlText] = useState("");
  const [dropDownArray, setDropDownArray] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewBadgeAddBtn, setShowNewbadgeAddBtn] = useState(false);
  const [suggestionsArr, setSuggestionsArr] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const closeModalView = () => {
    dispatch(closeModal());
    dispatch(clearCurrentBadgeList());
    dispatch(closeError());
  };

  const createID = () => {
    var milliSec = new Date().getTime();
    var idFormat = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    var uuid = idFormat.replace(/[xy]/g, function (c) {
      var r = (milliSec + Math.random() * 16) % 16 | 0; // learn...
      milliSec = Math.floor(milliSec / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  };

  const badgeValidator = () => {
    if (currentBadgeList.current.children[0].children.length) {
      return true;
    } else {
      return false;
    }
  };

  const validator = () => {
    if (!(urlText && badgeValidator())) {
      dispatch(
        showError({ type: "error", message: "Cannot leave fields empty!" })
      );
      return false;
    }
    return true;
  };

  const getData = () => {
    let flag = validator();
    if (flag) {
      dispatch(closeError());
      let id = createID();
      dispatch(
        addUrl({
          itemId: id,
          url: urlText,
          badges: badgeStoreArray.currentBadges,
        })
      );
      dispatch(closeModal()); // do this once the data addition is success
      dispatch(clearCurrentBadgeList());
    }
  };

  const handleDelete = (item) => {
    dispatch(removeBadgeFromCurrent(item));
  };

  const newBadgeInput = useRef();
  const currentBadgeList = useRef();

  const searchBadge = (value) => {
    if (value) {
      dispatch(closeError());
      const availableBadges = badgeStoreArray.badges.filter((item) => {
        return item.includes(value);
      });
      if (availableBadges.length) {
        setDropDownArray(availableBadges);
        setShowNewbadgeAddBtn(false);
        setShowDropdown(true);
      } else {
        setShowNewbadgeAddBtn(true);
        setShowDropdown(false);
      }
    } else {
      setShowNewbadgeAddBtn(false);
      setDropDownArray([]);
    }
  };

  const showDuplicateBadgeError = () => {
    dispatch(showError({ type: "error", message: "Badge already added!" }));
  };

  const addNewBadgeAction = (newBadge) => {
    dispatch(addNewBadge(newBadge));
    dispatch(addBadge(newBadge));
  };

  const createNewBadge = () => {
    const newBadge = newBadgeInput.current.value;

    let itemFound = badgeStoreArray.currentBadges.find((item) => {
      return item.match(newBadge);
    });

    if (!!itemFound) {
      showDuplicateBadgeError();
    } else {
      addNewBadgeAction(newBadge);
    }

    newBadgeInput.current.value = "";
  };

  // useEffect(() => {
  //   console.log("current badge  array", currentBadgeArray);
  // }, [currentBadgeArray]);

  // useEffect(() => {
  //   console.log("dropdownarray", dropDownArray);
  // }, [dropDownArray]);

  // useEffect(() => {
  //   console.log(badgeStoreArray.currentBadges);
  //   // if (badgeStoreArray.badgeSelectedFlag) {
  //   //   newBadgeInput.current.value = "";
  //   // }
  // }, [badgeStoreArray]);

  // const keyWordGen = (host) => {
  //   let keyWord = host;
  //   if (keyWord.includes("www.")) {
  //     keyWord = keyWord.replace("www.", "");
  //   }
  //   if (keyWord.includes(".com")) {
  //     keyWord = keyWord.replace(".com", "");
  //   }
  //   return keyWord;
  // };

  const validateUrl = (string) => {
    if (validUrl.isUri(string)) {
      return true;
    }
    return false;
  };

  const setUrl = (e) => {
    setUrlText(e.target.value);
    if (e.target.value && validateUrl(e.target.value)) {
      dispatch(closeError());
      //const { hostname } = new URL(e.target.value);
      //let searchQuery = keyWordGen(hostname);
      axios
        .post("http://localhost:5000/parse", {
          url: e.target.value,
        })
        .then((res) => {
          setSuggestionsArr(res.data.results);
          setImageUrl(res.data.logo);
        });
    } else {
      dispatch(showError({ type: "error", message: "Invalid url format" }));
    }
  };

  const addBadgeFromRecommendation = (selectedBadge) => {
    let itemFound = badgeStoreArray.currentBadges.find((item) => {
      return item.match(selectedBadge.target.textContent);
    });

    if (!!itemFound) {
      showDuplicateBadgeError();
    } else {
      dispatch(addNewBadge(selectedBadge.target.textContent));
      dispatch(addBadge(selectedBadge.target.textContent));
      dispatch(badgeSelected(selectedBadge.target.textContent));
    }
  };

  const showRecommendation = () => {
    if (suggestionsArr.length) {
      return suggestionsArr.map((item, index) => {
        return (
          <Chip
            key={index}
            label={item[0]}
            className="suggestion-badges"
            onClick={addBadgeFromRecommendation}
          />
        );
      });
    }
  };

  useEffect(() => {
    if (badgeStoreArray.badgeSelectedFlag) {
      newBadgeInput.current.value = "";
      dispatch(badgeUnselected());
      setShowDropdown(false);
    }
  }, [badgeStoreArray]);

  useEffect(() => {
    if (urlText === "") {
      dispatch(closeError());
    }
  }, [urlText]);

  useEffect(() => {
    if (suggestionsArr.length) {
      console.log(suggestionsArr);
    }
  }, [suggestionsArr]);

  return (
    <>
      {modalState.visibility && (
        <div className="modal">
          <ClearIcon
            sx={{ fontSize: 30 }}
            className="close-modal-button"
            onClick={closeModalView}
          />
          <div className="user-input">
            <input
              placeholder="Paste url..."
              onChange={(e) => setUrl(e)}
              className="url-input"
            />
            <div className="suggestion-canvas">
              {suggestionsArr.length ? (
                <div className="show-suggestions">
                  {suggestionsArr.length ? showRecommendation() : null}
                </div>
              ) : null}
              {imageUrl && (
                <div className="logo-canvas">
                  <img
                    src={imageUrl}
                    alt="img-preview"
                    className="imgPreview"
                  />
                </div>
              )}
            </div>
            <div className="badge-formControl">
              <div className="addbadge-input">
                <input
                  ref={newBadgeInput}
                  className="newBadgeInput"
                  onChange={(e) => searchBadge(e.target.value)}
                  placeholder="Add badge..."
                />
                {showNewBadgeAddBtn ? (
                  <AddIcon
                    fontSize={"large"}
                    className="add-newBadge"
                    onClick={createNewBadge}
                  />
                ) : null}
              </div>
              {dropDownArray.length && showDropdown ? (
                <Dropdown listArray={dropDownArray} />
              ) : null}
            </div>
          </div>
          <span
            placeholder="Badges..."
            className="selected-badges"
            ref={currentBadgeList}
          >
            {badgeStoreArray.currentBadges.length ? (
              badgeStoreArray.currentBadges.map((item, index) => {
                let badgeText = item;
                return (
                  <Chip
                    key={index}
                    className="new-added-badge"
                    label={item}
                    onDelete={() => handleDelete(badgeText)}
                  />
                );
              })
            ) : (
              <span className="placeholder">Badges... </span>
            )}
          </span>
          <Button btnText={"Save"} onClick={getData} className={"save-badge"} />
        </div>
      )}
    </>
  );
};

export default Modal;
