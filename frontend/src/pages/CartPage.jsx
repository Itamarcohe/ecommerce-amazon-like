import { useContext } from "react";
import { Store } from "../store.jsx";
import { toast } from "react-toastify";
import { getError } from "../../utils.js";
import { ADD_TO_CART, GET_FAILURE, REMOVE_FROM_CART } from "../actions.jsx";
import Title from "../components/shared/Title.jsx";
import { Col, Row } from "react-bootstrap";
import ItemsInCart from "../components/cart/ItemsInCart.jsx";
import Checkout from "../components/cart/Checkout.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch: ctxDispatch,
  } = useContext(Store);
  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  const navigate = useNavigate();
  const updateCartHandler = async (item, quantity) => {
    try {
      const { data: product } = await axios.get(`/api/v1/products/${item._id}`);
      if (product.countInStock < quantity) {
        toast.error("Sorry, Product is out of stock");
        return;
      }
      ctxDispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    } catch (err) {
      ctxDispatch({ type: "GET_FAILURE", payload: err.message });
      toast.error(getError(err));
    }
  };

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  return (
    <div>
      <Title title="Shopping Cart" />
      <Row>
        <Col md={8}>
          <ItemsInCart
            updateCartHandler={updateCartHandler}
            cartItems={cartItems}
            removeItemHandler={removeItemHandler}
          />
        </Col>
        <Col md={4}>
          <Checkout cartItems={cartItems} checkOutHandler={checkOutHandler} />
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
