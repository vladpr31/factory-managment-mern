import React from "react";

const Input = ({ props }) => {
  return (
    <>
      <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 text-glow">
        {props.name}:
      </label>
      <input
        type={props.type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg f block w-full p-2.5 mb-6"
        placeholder={props.placeholder}
        required={props.required}
        id={props.id}
        onChange={props.onChangeHandler}
        value={props.inputValue ? props.inputValue : ""}
      />
    </>
  );
};

export default Input;
