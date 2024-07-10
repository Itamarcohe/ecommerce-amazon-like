import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from "../actions.jsx";

const orderPageReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST: {
      return { ...state, loading: true, error: "" };
    }
    case GET_SUCCESS: {
      return { ...state, loading: false, order: payload, error: "" };
    }
    case GET_FAILURE: {
      return { ...state, error: action.payload, loading: false };
    }
  }
};

export default orderPageReducer;
