import React, { useState, useEffect, useRef, useCallback } from "react";
// import Button from "../Button";
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

import { styled, alpha } from "@mui/material/styles";
import {
  addBadgeFromDropDown,
  resetToggleKeyDown,
  resetToggleKeyUp,
  toggleKeyDown,
  toggleKeyUp,
} from "../../redux/DropDown/action";
import BadgeContainer from "../BadgeContainer";
import debounce from "lodash.debounce";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = () => {
  const dispatch = useDispatch();

  //const modalState = useSelector((state) => state.ModalReducer);
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
  const [isError, setError] = useState(false);

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
      setError(true);
      dispatch(
        showError({ type: "error", message: "Cannot leave fields empty!" })
      );
      return false;
    }
    setError(false);
    return true;
  };

  const getData = () => {
    let flag = validator();
    if (flag) {
      setError(false);
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
    console.log(value);
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
    setError(true);
    dispatch(showError({ type: "error", message: "Badge already added!" }));
  };

  const createNewBadge = () => {
    newBadgeInput.current.value = "";
  };

  const validateUrl = (string) => {
    if (validUrl.isUri(string)) {
      setError(false);
      return true;
    }
    setError(true);
    return false;
  };

  const setUrl = (e) => {
    let inputUrl = e.target.value;
    if (inputUrl === "") {
      setSuggestionsArr([]);
      setImageUrl("");
      dispatch(stopLoader());
    } else {
      dispatch(showLoader());
      let finalUrl;
      if (
        inputUrl.indexOf("https://") === -1 &&
        inputUrl.indexOf("http://") === -1
      ) {
        finalUrl = "https://" + inputUrl;
      } else {
        finalUrl = inputUrl;
      }
      setUrlText(finalUrl);
      if (finalUrl && !isError) {
        dispatch(closeError());
        dispatch(duplicateUrlCheck(e.target.value));
        optimisedFunctionCall(finalUrl);
      } else {
        setError(true);
        dispatch(showError({ type: "error", message: "Invalid url format" }));
        dispatch(stopLoader());
      }
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

  const apiFunctionCall = (urlParam) => {
    let isValidate = validateUrl(urlParam);
    if (isValidate) {
      dispatch(closeError());
      setError(false);
      axios
        //.post("https://linkeeper-backend.herokuapp.com/parse", {
        .post("http://localhost:5000/parse", {
          url: urlParam,
        })
        .then((res) => {
          setSuggestionsArr(res.data.results);
          setImageUrl(res.data.logo);
          setShortUrlTitle(res.data.title);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
      dispatch(showError({ type: "error", message: "Invalid url format" }));
      dispatch(stopLoader());
    }
  };

  const optimisedFunctionCall = useCallback(
    debounce(apiFunctionCall, 1000),
    []
  );

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
      setError(true);
      dispatch(showError({ type: "error", message: "Url already exist!" }));
      dispatch(stopLoader());
    } else {
      setError(false);
    }
  }, [urlState]);

  return (
    <Card>
      <CardContent>
        <TextField
          onChange={(e) => setUrl(e)}
          placeholder="Paste url..."
          variant="outlined"
          size="small"
          className="url-input-field"
          //sx={{ width: "38vw" }}
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
          {imageUrl ? (
            <div className="logo-canvas">
              <img src={imageUrl} alt="img-preview" className="imgPreview" />
            </div>
          ) : null}
        </div>
        <div className="badge-formControl">
          {/* <div className="addbadge-input"> */}
          {/* <input
              onKeyDown={(e) => toggleDropdownSelect(e)}
              ref={newBadgeInput}
              className="newBadgeInput"
              onChange={(e) => searchBadge(e.target.value)}
              placeholder="Add badge..."
            /> */}
          <TextField
            onKeyDown={(e) => toggleDropdownSelect(e)}
            ref={newBadgeInput}
            className="newBadgeInput"
            onChange={(e) => searchBadge(e.target.value)}
            placeholder="Add badge..."
            variant="outlined"
            size="small"
            //sx={{ width: "38vw", marginTop: "0.5em" }}
          />
          {showNewBadgeAddBtn ? (
            <AddIcon
              fontSize={"large"}
              className="add-newBadge"
              onClick={createNewBadge}
            />
          ) : null}
          {/* </div> */}
          {dropDownArray.length && showDropdown ? (
            <Dropdown listArray={dropDownArray} />
          ) : null}
        </div>
        <span
          placeholder="Badges..."
          className="selected-badges"
          ref={currentBadgeList}
        >
          {/* <Typography
          component={"span"}
          className="selected-badges"
          //sx={{ width: "36vw", marginTop: "0.5em" }}
          ref={currentBadgeList}
        > */}
          {/* <TextField
          placeholder="Badges..."
          variant="outlined"
          size="small"
          sx={{ width: "36vw", marginTop: "0.5em" }}
          //className="selected-badges"
          ref={currentBadgeList}
        /> */}
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
            // <Typography>Badges...</Typography>
            // <TextField
            //   className="placeholder"
            //   placeholder="Badges..."
            //   variant="outlined"
            //   size="small"
            //   sx={{ width: "36vw", marginTop: "0.5em" }}
            //   //className="selected-badges"
            //   // ref={currentBadgeList}
            // />
          )}
          {/* </Typography> */}
        </span>
      </CardContent>
      {/* <Button btnText={"Save"} onClick={getData} className={"save-badge"} /> */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={getData}
          //sx={{ marginRight: "2em" }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default Modal;
