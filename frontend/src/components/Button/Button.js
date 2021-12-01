import React from "react";

const Button = ({ btnText, onClick, className }) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
};

export default Button;
