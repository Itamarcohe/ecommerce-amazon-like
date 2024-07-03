import React from "react";
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import storeReducer from "./reducers/storeReducer.jsx";

const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    cartItems: JSON.parse(localStorage.getItem("cartItems"))
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: JSON.parse(localStorage.getItem("shippingAddress"))
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: JSON.parse(localStorage.getItem("paymentMethod"))
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "",
  },
};
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const body = { state, dispatch };

  return <Store.Provider value={body}>{children}</Store.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export { StoreProvider, Store };
