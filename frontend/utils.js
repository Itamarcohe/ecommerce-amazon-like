import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAILURE } from "./src/actions.jsx";
import axios from "axios";

const getError = (err) => {
  return err.message && err.response.data.message
    ? err.response.data.message
    : err.message;
};

const addToCartHandler = async (product, cartItems, ctxDispatch) => {
  console.log(product);
  console.log(cartItems);
  const existedItem = cartItems.find((item) => item._id === product._id);
  console.log(existedItem);
  const quantity = existedItem ? existedItem.quantity + 1 : 1;
  console.log(quantity);
  try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  } catch (err) {
    ctxDispatch({ type: "GET_FAILURE", payload: err.message });
  }
};

export { getError, addToCartHandler };
