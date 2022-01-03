import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  addBadge,
  removeBadgeFromCurrent,
  removeBadgeFromGlobal,
} from "../../redux/Badges/action";

const BadgeContainer = ({ label, onClick, status, onDelete, screenWidth }) => {
  const [doneState, setDoneState] = useState(false);
  const [clearState, setClearState] = useState(false);
  const [toggleClear, setToggleClear] = useState(false);
  const [state4, setState4] = useState(false);
  const [touchDeviceStatus, setTouchDeviceStatus] = useState(false);

  const dispatch = useDispatch();
  const parentContainer = useRef();

  const { height, width } = useWindowDimensions();

  const checkForMobileDevices = () => {
    if (width <= 810) {
      setTouchDeviceStatus(true);
      // if (clearIconMobile) {
      //   console.log("helo1");
      //   setDoneIconMobile(false);
      //   setClearIconMobile(false);
      //   setAddIconMobile(true);
      // } else if (addIconMobile) {
      //   console.log("helo2");
      //   setAddIconMobile(false);
      //   setDoneIconMobile(false);
      // }
      // else
      console.log(clearIconMobile);
      if (!doneIconMobile) {
        setClearIconMobile(true);
        setDoneIconMobile(true);
      }
      if (!clearIconMobile) {
        setDoneIconMobile(false);
        setClearIconMobile(false);
        setAddIconMobile(true);
      }
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

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

  const unSelectBadge = () => {
    onDelete();
    setDoneState(true);
    setClearState(false);
    setToggleClear(false);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(removeBadgeFromCurrent(selectedBadge));
    dispatch(removeBadgeFromGlobal(selectedBadge));
  };

  const addBackBadge = () => {
    setDoneState(false);
    setToggleClear(false);
    setClearState(true);
    setState4(true);
    let selectedBadge = parentContainer.current.children[0].textContent;
    dispatch(addBadge(selectedBadge));
  };

  const showAddIcon = () => {
    return <AddCircleOutlineIcon className="add-icon" />;
  };

  const toggleHoverState = (flag) => {
    if (!state4) {
      if (flag) {
        setDoneState(false);
      } else {
        setDoneState(true);
      }
    }
    setClearState(true);
    setToggleClear(false);
    setState4(false);
  };

  const showClearIcon = () => {
    return toggleClear ? null : clearState ? (
      <HighlightOffIcon
        className="clear-icon"
        onMouseLeave={() => toggleHoverState(true)}
        onClick={unSelectBadge}
      />
    ) : (
      <HighlightOffIcon className="rotateIcon" onClick={addBackBadge} />
    );
  };

  const showDoneIcon = () => {
    return !doneState ? (
      <CheckCircleOutlineIcon
        className="done-icon"
        onMouseEnter={() => toggleHoverState(false)}
        onClick={() => checkForMobileDevices()}
      />
    ) : null;
  };

  // const showClearIconMobile = () => {
  //   return <HighlightOffIcon className="rotateIcon" />;
  // };

  const [clearIconMobile, setClearIconMobile] = useState(false);
  const [doneIconMobile, setDoneIconMobile] = useState(false);
  const [addIconMobile, setAddIconMobile] = useState(false);

  const showAddIconForMobile = () => {
    if (width <= 810) {
      setTouchDeviceStatus(true);
      if (!doneIconMobile) {
        setDoneIconMobile(true);
        setClearIconMobile(true);
      } else if (clearIconMobile) {
        setClearIconMobile(false);
        setDoneIconMobile(false);
      }
      // setClearIconMobile(false);
      // setAddIconMobile(true);
    }
  };

  // if (width <= 810) {
  //   setTouchDeviceStatus(true);
  //   // setClearIconMobile(true);
  //   if (clearIconMobile) {
  //     setDoneIconMobile(false);
  //     setClearIconMobile(false);
  //     setAddIconMobile(true);
  //   } else if (addIconMobile) {
  //     console.log("helo2");
  //     setAddIconMobile(false);
  //     setDoneIconMobile(false);
  //   }

  const showDoneIconForMobile = () => {
    setClearIconMobile(false);
    setAddIconMobile(false);
  };

  return (
    <div
      className="badgeContainer"
      ref={parentContainer}
      //{...(status && (onClick = { onClick }))}
      // : (onClick = () => showAddIconForMobile()))}
      //  (onClick = () => console.log("helo")))}
      //onClick={() => showAddIconForMobile()}
      //{...(status && (onClick = () => console.log("helo")))}
      //onClick={onClick}
    >
      <span
        onClick={status ? onClick : () => showAddIconForMobile()}
        //onClick={onClick}
        //onClick={() => showAddIconForMobile()}
      >
        {label}
      </span>
      {touchDeviceStatus ? (
        <>
          {/* {!clearIconMobile ?  (
            <HighlightOffIcon
              className="clear-icon"
              onClick={() => setClearIconMobile(true)}
            />
          ) : (
            <HighlightOffIcon
              className="rotateIcon"
              onClick={() => }
            />
          )} */}
          {/* {clearIconMobile ? (
            <HighlightOffIcon
              className="clear-icon"
              //onClick={() => setClearIconMobile(true)}
              onClick={() => checkForMobileDevices()}
            />
          ) : addIconMobile ? (
            <HighlightOffIcon
              className="rotateIcon"
              onClick={() => checkForMobileDevices()}
            />
          ) : (
            <CheckCircleOutlineIcon
              className="done-icon"
              onMouseEnter={() => toggleHoverState(false)}
              onClick={() => checkForMobileDevices()}
            />
          )} */}
          {!doneIconMobile && (
            <CheckCircleOutlineIcon
              className="done-icon"
              onMouseEnter={() => toggleHoverState(false)}
              onClick={() => checkForMobileDevices()}
            />
          )}
          {clearIconMobile && (
            <HighlightOffIcon
              className="clear-icon"
              //onClick={() => setClearIconMobile(true)}
              // onClick={() => checkForMobileDevices()}
            />
          )}
          {addIconMobile && (
            <HighlightOffIcon
              className="rotateIcon"
              // onClick={() => checkForMobileDevices()}
            />
          )}
        </>
      ) : (
        <>
          {status ? showAddIcon() : showDoneIcon()}
          {doneState && showClearIcon()}
        </>
      )}
    </div>
  );
};

export default BadgeContainer;
