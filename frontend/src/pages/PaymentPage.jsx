import { useContext, useEffect, useState } from "react";
import { Store } from "../store.jsx";
import { SAVE_PAYMENT_METHOD } from "../actions.jsx";
import { useNavigate } from "react-router-dom";
import Title from "../components/shared/Title.jsx";
import CheckoutSteps from "../components/shared/CheckoutSteps.jsx";
import { Button, Container, Form } from "react-bootstrap";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
    userInfo,
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayPal",
  );
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: paymentMethodName,
    });
  };
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cartItems, navigate, shippingAddress, userInfo]);
  return (
    <div>
      <Title title="Payment" />
      <CheckoutSteps step1 step2 step3 />
      <Container className="small-container">
        <h1 className="my-3">Payment</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="stripe">
            <Form.Label>Stripe </Form.Label>
            <Form.Check
              type="radio"
              id="stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="paypal">
            <Form.Label>Paypal </Form.Label>
            <Form.Check
              type="radio"
              id="paypal"
              value="Paypal"
              checked={paymentMethod === "Paypal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PaymentPage;
