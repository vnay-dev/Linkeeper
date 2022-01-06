import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeError, showError } from "../../redux/Error/action";
import { addUrl, duplicateUrlCheck } from "../../redux/Urls/action";
import CloseIcon from "@mui/icons-material/Close";
import {
  addBadge,
  addBadgeToCurrent,
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
import debounce from "lodash.debounce";
import { Card, CardContent, TextField, Button } from "@mui/material";
import SuggestionBadge from "../BadgeContainer/SuggestionBadges";
import SelectedBadge from "../BadgeContainer/SelectedBadges";

const Modal = () => {
  const dispatch = useDispatch();

  const badgeStoreArray = useSelector((state) => state.BadgeReducer);
  const loaderState = useSelector((state) => state.LoaderReducer);
  const dropDrownToggle = useSelector((state) => state.DropDownReducer);
  const urlState = useSelector((state) => state.UrlReducer);
  const errorState = useSelector((state) => state.ErrorReducer);

  const [urlText, setUrlText] = useState("");
  const [dropDownArray, setDropDownArray] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewBadgeAddBtn, setShowNewbadgeAddBtn] = useState(false);
  const [suggestionsArr, setSuggestionsArr] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [shortUrlTitle, setShortUrlTitle] = useState("");
  //const [isError, setError] = useState(false);

  const [validUrlErr, setValidUrlErr] = useState(false);
  const [inputFieldErr, setInputFieldErr] = useState(false);
  const [duplicateBadgeErr, setDuplicateBadgeErr] = useState(false);

  const [urlClearButton, setUrlClearButton] = useState(false);

  const newBadgeInput = useRef();
  const currentBadgeList = useRef();
  const urlInputText = useRef();
  const suggestionCanvas = useRef();

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
      //setError(true);
      setInputFieldErr(true);
      dispatch(
        showError({ type: "error", message: "Cannot leave fields empty!" })
      );
      return false;
    }
    console.log("helo1");
    //setError(false);
    setInputFieldErr(false);
    return true;
  };

  const clearFormData = () => {
    urlInputText.current.children[0].children[0].value = "";
    setImageUrl("");
    setSuggestionsArr([]);
    suggestionCanvas.current.className = "suggestion-canvas";
  };

  const storeData = () => {
    let flag = validator();
    if (flag) {
      setUrlClearButton(false);
      console.log("helo2");
      // setError(false);
      //setSubmitDataErr(false);
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

      dispatch(clearCurrentBadgeList());
      dispatch(resetSelectionActivityArray());
      clearFormData();
    } else {
      // setError(true)
      //setSubmitDataErr(true);
    }
  };

  const handleDelete = (item) => {
    dispatch(removeBadgeFromCurrent(item));
  };

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
    //setError(true);
    setDuplicateBadgeErr(true);
    dispatch(showError({ type: "error", message: "Badge already added!" }));
  };

  const createNewBadge = () => {
    let customBadge = newBadgeInput.current.children[0].children[0].value;
    dispatch(addSelectionActivityArray(customBadge));
    dispatch(addBadgeToCurrent(customBadge));
    dispatch(addBadge(customBadge));
    dispatch(addBadgeFromDropDown());
    newBadgeInput.current.children[0].children[0].value = "";
  };

  const validateUrl = (string) => {
    if (validUrl.isUri(string)) {
      console.log("helo3");
      //setError(false);
      setValidUrlErr(false);
      return true;
    }
    //setError(true);
    setValidUrlErr(true);
    return false;
  };

  const setUrl = (e) => {
    let inputUrl = e.target.value;
    if (inputUrl === "") {
      setSuggestionsArr([]);
      setImageUrl("");
      dispatch(stopLoader());
    } else {
      setUrlClearButton(true);
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
      let isError = validUrlErr && inputFieldErr && duplicateBadgeErr;
      if (finalUrl && !isError) {
        dispatch(closeError());
        dispatch(duplicateUrlCheck(e.target.value));
        optimisedFunctionCall(finalUrl);
      } else {
        //setError(true);
        setValidUrlErr(true);
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
      dispatch(addBadgeToCurrent(selectedBadge));
      dispatch(addSelectionActivityArray(selectedBadge));
      dispatch(badgeSelected(selectedBadge));
      dispatch(closeError());
    }
  };

  const showRecommendation = () => {
    if (suggestionsArr.length) {
      return suggestionsArr.map((item, index) => {
        return (
          <SuggestionBadge
            label={item[0]}
            key={index}
            onClick={() => addBadgeFromRecommendation(item[0])}
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
      if (errorState.visibility) {
        dispatch(closeError());
      }
    }
  };

  const apiFunctionCall = (urlParam) => {
    let isValidate = validateUrl(urlParam);
    let isError = validUrlErr && inputFieldErr && duplicateBadgeErr;
    if (isValidate && !isError) {
      // dispatch(closeError());
      // setError(false);
      // if (!isError) {
      console.log("ehlo");
      axios
        .post("https://linkeeper-backend.herokuapp.com/parse", {
          // .post("http://localhost:5000/parse", {
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
      //}
    } else {
      //setError(true);
      setValidUrlErr(true);
      dispatch(showError({ type: "error", message: "Invalid url format" }));
      dispatch(stopLoader());
    }
  };

  const optimisedFunctionCall = useCallback(
    debounce(apiFunctionCall, 1000),
    []
  );

  const { width } = useWindowDimensions();

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const clearUrlInput = () => {
    urlInputText.current.children[0].children[0].value = "";
    dispatch(stopLoader());
  };

  useEffect(() => {
    if (dropDownArray.length && showDropdown) {
      newBadgeInput.current.children[0].children[0].value = "";
      dispatch(badgeUnselected());
      setShowDropdown(false);
    }
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
      //setError(true);
      setDuplicateBadgeErr(true);
      dispatch(showError({ type: "error", message: "Url already exist!" }));
      dispatch(stopLoader());
    } else {
      console.log("helo5");
      //setError(false);
      setDuplicateBadgeErr(false);
    }
  }, [urlState]);

  return (
    <Card className="card-wrapper">
      <CardContent className="card-wrapper-body">
        <TextField
          ref={urlInputText}
          onChange={(e) => setUrl(e)}
          placeholder="Paste url..."
          variant="outlined"
          size="small"
          className="url-input-field"
          InputProps={{
            endAdornment: urlClearButton ? (
              <CloseIcon
                style={{ color: "rgb(177, 171, 171)" }}
                onClick={() => clearUrlInput()}
              />
            ) : null,
          }}
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
        <div
          className={`suggestion-canvas ${
            imageUrl && shortUrlTitle && suggestionsArr.length
              ? "suggestion-canvas-addMargin"
              : ""
          }`}
          ref={suggestionCanvas}
        >
          {imageUrl ? (
            <div className="logo-canvas">
              <img src={imageUrl} alt="img-preview" className="imgPreview" />
            </div>
          ) : null}
          {suggestionsArr.length ? (
            <div className="preview-suggestions">
              <span className="summary">In short : {shortUrlTitle}</span>
              <div className="show-suggestions">
                {suggestionsArr.length ? showRecommendation() : null}
              </div>
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
            InputProps={{
              endAdornment: showNewBadgeAddBtn ? (
                <AddIcon
                  fontSize={"small"}
                  className="add-newBadge"
                  onClick={createNewBadge}
                />
              ) : null,
            }}
          />
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
                // <BadgeContainer
                //   key={index}
                //   label={item}
                //   status={false}
                //   onDelete={() => handleDelete(badgeText)}
                //   onClick={() => addBadgeFromRecommendation(badgeText)}
                //   setDoneIconState={setDoneIconState}
                //   setClearIconState={setClearIconState}
                //   setAddIconState={setAddIconState}
                // />
                width < 1280 ? (
                  <SelectedBadge
                    key={index}
                    label={item}
                    onClick={() => addBadgeFromRecommendation(badgeText)}
                    onDelete={() => handleDelete(badgeText)}
                    status={true}
                    // doneState={doneIconState}
                    // clearState={clearIconState}
                    // addState={addIconState}
                  />
                ) : (
                  <SelectedBadge
                    key={index}
                    label={item}
                    //onClick={() => addBadgeFromRecommendation(badgeText)}
                    onDelete={() => handleDelete(badgeText)}
                    status={false}
                    // doneState={doneIconState}
                    // clearState={clearIconState}
                    // addState={addIconState}
                  />
                )
              );
            })
          ) : (
            <span className="placeholder">Badges... </span>
          )}
        </span>
        <Button
          color="secondary"
          variant="contained"
          onClick={storeData}
          className="submit-form-btn"
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default Modal;
