import React from "react";

const Button = ({ props }) => {
  return (
    <button
      type={props.type}
      className="w-full text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-[#04b4db] "
      onClick={props.onClickHandler}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
