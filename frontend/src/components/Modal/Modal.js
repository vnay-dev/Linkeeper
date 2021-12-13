import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/Modal/action";
import { closeError, showError } from "../../redux/Error/action";
import { addUrl, duplicateUrlCheck } from "../../redux/Urls/action";

import ClearIcon from "@mui/icons-material/Clear";
import {
  addBadge,
  addNewBadge,
  addSelectionActivityArray,
  badgeSelected,
  badgeUnselected,
  clearCurrentBadgeList,
  removeBadgeFromCurrent,
  resetSelectionActivityArray,
} from "../../redux/Badges/action";
import Dropdown from "../Dropdown";
import axios from "axios";
import validUrl from "valid-url";
import AddIcon from "@mui/icons-material/Add";
import ReactLoading from "react-loading";
import { showLoader, stopLoader } from "../../redux/Loader/action";
import {
  addBadgeFromDropDown,
  resetToggleKeyDown,
  resetToggleKeyUp,
  toggleKeyDown,
  toggleKeyUp,
} from "../../redux/DropDown/action";
import BadgeContainer from "../BadgeContainer";

const Modal = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.ModalReducer);
  const badgeStoreArray = useSelector((state) => state.BadgeReducer);
  const loaderState = useSelector((state) => state.LoaderReducer);
  const dropDrownToggle = useSelector((state) => state.DropDownReducer);
  const urlState = useSelector((state) => state.UrlReducer);

  const [urlText, setUrlText] = useState("");
  const [dropDownArray, setDropDownArray] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewBadgeAddBtn, setShowNewbadgeAddBtn] = useState(false);
  const [suggestionsArr, setSuggestionsArr] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [shortUrlTitle, setShortUrlTitle] = useState("");

  const [arrCurrent, setArrCurrent] = useState([]);

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
    if (badgeStoreArray.currentBadges.length) {
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
          title: shortUrlTitle,
        })
      );
      dispatch(closeModal()); // do this once the data addition is success
      dispatch(clearCurrentBadgeList());
      dispatch(resetSelectionActivityArray());
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
        return item.toLowerCase().includes(value.toLowerCase());
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
    // setArrCurrent([...arrCurrent, newBadge]);
    //dispatch(addSelectionActivityArray(newBadge));
    //addNewBadgeAction(newBadge);

    // let itemFound = badgeStoreArray.currentBadges.find((item) => {
    //   return item.match(newBadge);
    // });

    // if (!!itemFound) {
    //   showDuplicateBadgeError();
    // } else {
    //   addNewBadgeAction(newBadge);
    // }

    newBadgeInput.current.value = "";
  };

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
      dispatch(duplicateUrlCheck(e.target.value));
    } else {
      dispatch(showError({ type: "error", message: "Invalid url format" }));
    }
  };

  const addBadgeFromRecommendation = (selectedBadge) => {
    let itemFound = badgeStoreArray.currentBadges.find((item) => {
      return item.match(selectedBadge);
    });
    if (!!itemFound) {
      showDuplicateBadgeError();
    } else {
      dispatch(addBadge(selectedBadge));
      dispatch(addSelectionActivityArray(selectedBadge));
      dispatch(badgeSelected(selectedBadge));
      dispatch(closeError());
    }
  };

  const showRecommendation = () => {
    if (suggestionsArr.length) {
      return suggestionsArr.map((item, index) => {
        return (
          <BadgeContainer
            key={index}
            label={item[0]}
            onClick={() => addBadgeFromRecommendation(item[0])}
            status={true}
            onDelete={() => handleDelete(item[0])}
          />
        );
      });
    }
  };

  const toggleDropdownSelect = (e) => {
    if (e.keyCode === 40) {
      if (dropDrownToggle.cursor >= dropDownArray.length - 1) {
        dispatch(resetToggleKeyDown());
      } else {
        dispatch(toggleKeyDown());
      }
    } else if (e.keyCode === 38) {
      if (dropDrownToggle.cursor <= 0) {
        dispatch(resetToggleKeyUp(dropDownArray.length - 1));
      } else {
        dispatch(toggleKeyUp());
      }
    } else if (e.keyCode === 13) {
      dispatch(addBadgeFromDropDown());
    }
  };

  useEffect(() => {
    if (badgeStoreArray.badgeSelectedFlag) {
      newBadgeInput.current.value = "";
      dispatch(badgeUnselected());
      setShowDropdown(false);
    }
    //console.log(badgeStoreArray.badges);
  }, [badgeStoreArray]);

  useEffect(() => {
    if (suggestionsArr.length && imageUrl) {
      dispatch(stopLoader());
    }
  }, [suggestionsArr, imageUrl]);

  useEffect(() => {
    if (urlText) {
      dispatch(showLoader());
    } else {
      dispatch(closeError());
      dispatch(stopLoader());
    }
  }, [urlText]);

  useEffect(() => {
    if (urlState.duplicateUrl) {
      dispatch(
        dispatch(showError({ type: "error", message: "Url already exist!" }))
      );
    } else {
      axios
        .post("https://linkeeper-backend.herokuapp.com/parse", {
          url: urlText,
        })
        .then((res) => {
          setSuggestionsArr(res.data.results);
          setImageUrl(res.data.logo);
          setShortUrlTitle(res.data.title);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [urlState]);

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
            {loaderState.visibility && (
              <ReactLoading
                type={"bubbles"}
                color="rgb(155, 155, 155)"
                height={"2%"}
                width={"5%"}
                className="loader"
              />
            )}
            <div className="suggestion-canvas">
              {suggestionsArr.length ? (
                <div className="preview-suggestions">
                  <span>In short : {shortUrlTitle}</span>
                  <div className="show-suggestions">
                    {suggestionsArr.length ? showRecommendation() : null}
                  </div>
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
                  onKeyDown={(e) => toggleDropdownSelect(e)}
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
            {badgeStoreArray.selectionActivityArray.length ? (
              badgeStoreArray.selectionActivityArray.map((item, index) => {
                let badgeText = item;
                return (
                  <BadgeContainer
                    key={index}
                    label={item}
                    status={false}
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
