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
  return props !== auth.id ? (
    <button
      onClick={clickHandler}
      className={
        "mx-auto  relative flex justify-center items-center underline text-glow"
      }
    >
      Back To Your Profile
    </button>
  ) : null;
};

export default BackButton;
