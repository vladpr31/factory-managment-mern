import React from "react";
import { Navigate } from "react-router";
const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("profile"));
  if (auth) {
    return children;
  } else {
    return Navigate({ to: "/", replace: true });
  }
};

export default React.memo(ProtectedRoute);
