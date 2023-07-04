import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import Reducers from "./Context/store";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const store = configureStore(
  { reducer: Reducers },
  {},
  compose(applyMiddleware(thunk))
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
