import { useContext } from "react";
import { Store } from "../store.jsx";
import { toast } from "react-toastify";
import { getError } from "../../utils.js";
import { ADD_TO_CART, GET_FAILURE } from "../actions.jsx";
import Title from "../components/shared/Title.jsx";
import { Col, Row } from "react-bootstrap";
import ItemsInCart from "../components/cart/ItemsInCart.jsx";
import Checkout from "../components/cart/Checkout.jsx";
import axios from "axios";

const CartPage = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch: ctxDispatch,
  } = useContext(Store);

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
  console.log(cartItems);

  return (
    <div>
      <Title title="Shopping Cart" />
      <Row>
        <Col md={8}>
          <ItemsInCart
            updateCartHandler={updateCartHandler}
            cartItems={cartItems}
          />
        </Col>
        <Col md={4}>
          <Checkout cartItems={cartItems} />
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
