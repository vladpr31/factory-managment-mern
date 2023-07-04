import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const BackButton = ({ props }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  const clickHandler = () => {
    navigate(`/user/${auth.id}`);
  };
  if (!auth?.id) {
    return null;
  }
  return (
    <button
      onClick={clickHandler}
      className={
        props == auth.id
          ? "invisible"
          : "mx-auto text-black relative flex justify-center items-center underline text-glow"
      }
    >
      Back To Profile
    </button>
  );
};

export default BackButton;
