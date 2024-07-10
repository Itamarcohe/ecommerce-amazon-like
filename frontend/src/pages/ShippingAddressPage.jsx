import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../store.jsx";
import Title from "../components/shared/Title.jsx";
import { Button, Container, Form } from "react-bootstrap";
import CheckoutSteps from "../components/shared/CheckoutSteps.jsx";
import { SAVE_SHIPPING_ADDRESS } from "../actions.jsx";

const ShippingAddressPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const [enteredValues, setEnteredValues] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, cartItems, userInfo]);

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: SAVE_SHIPPING_ADDRESS, payload: enteredValues });
    localStorage.setItem("shippingAddress", JSON.stringify(enteredValues));
    navigate("/payment");
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      setEnteredValues(JSON.parse(savedAddress));
    }
  }, []);

  return (
    <div>
      <Title title="Shipping Address" />
      <CheckoutSteps step1 step2 />
      <Container className="small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredValues.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address: </Form.Label>
            <Form.Control
              value={enteredValues.address}
              type="text"
              required
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City: </Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredValues.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Country: </Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredValues.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code: </Form.Label>
            <Form.Control
              type="text"
              value={enteredValues.postalCode}
              required
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ShippingAddressPage;
