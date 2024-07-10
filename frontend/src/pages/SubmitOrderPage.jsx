// import { useContext, useEffect, useState } from "react";
// import { Store } from "../store.jsx";
// import { Link, useNavigate } from "react-router-dom";
// import { CLEAR_CART } from "../actions.jsx";
// import { toast } from "react-toastify";
// import { getError } from "../../utils.js";
// import Title from "../components/shared/Title.jsx";
// import CheckoutSteps from "../components/shared/CheckoutSteps.jsx";
// import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
// import Loading from "../components/shared/Loading.jsx";
//
// const SubmitOrderPage = () => {
//   const [loading, setLoading] = useState(false);
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { cart, userInfo } = state;
//   const { paymentMethod, cartItems, shippingAddress } = cart;
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       navigate("/");
//     }
//     if (!userInfo) {
//       navigate("/signin?redirect=/placeorder");
//     }
//     if (!shippingAddress) {
//       navigate("/shipping");
//     }
//     if (!paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cartItems, navigate, paymentMethod, userInfo, shippingAddress]);
//
//   const submitOrderHandler = async () => {
//     try {
//       setLoading(true);
//       ctxDispatch({ type: CLEAR_CART });
//       localStorage.removeItem("cartItems");
//       //navigate to order summary page by id
//     } catch (error) {
//       toast.error(getError(error));
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
//   cart.itemsPrice = round2(
//     cartItems.reduce(
//       (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
//       0,
//     ),
//   );
//   cart.taxPrice = round2(cart.itemsPrice * 0.17);
//   cart.shippingPrice =
//     cart.itemsPrice < 50
//       ? round2(cart.itemsPrice * 0.1)
//       : round2(cart.itemsPrice * 0.02);
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
//
//   const truncateTitle = (title) => {
//     return title.length > 27 ? title.substring(0, 27) + "..." : title;
//   };
//
//   return (
//     <div>
//       <Title title="Order Summary" />
//       <CheckoutSteps step1 step2 step3 step4 />
//       <h1 className="my-3">Order Summary</h1>
//       <Row>
//         <Col md={8}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Shipping</Card.Title>
//               <Card.Text>
//                 <strong>Name: </strong>
//                 {shippingAddress.fullName}
//                 <br />
//                 <strong>Address: </strong>
//                 {shippingAddress.address}
//                 <br />
//                 <strong>Postal Code: </strong>
//                 {shippingAddress.postalCode}
//                 <br />
//                 <strong>Country: </strong>
//                 {shippingAddress.country}
//                 <br />
//                 <strong>City: </strong>
//                 {shippingAddress.city}
//                 <br />
//               </Card.Text>
//               <Link to="/shipping">Edit</Link>
//             </Card.Body>
//           </Card>
//
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Payment</Card.Title>
//               <Card.Text>
//                 <strong>Method: </strong>
//                 {paymentMethod}
//               </Card.Text>
//               <Link to="/payment">Edit</Link>
//             </Card.Body>
//           </Card>
//
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title className="ms-3">Items</Card.Title>
//               <Row className="align-items-center mb-3">
//                 <Col md={6}>&nbsp;&nbsp; Description</Col>
//                 <Col md={3}>Quantity</Col>
//                 <Col md={3}>Total Price</Col>
//               </Row>
//               <ListGroup variant="flush">
//                 {cartItems.map((cartItem) => (
//                   <ListGroup.Item key={cartItem._id}>
//                     <Row className="align-items-center">
//                       <Col md={6}>
//                         <img
//                           src={cartItem.image}
//                           alt={cartItem.title}
//                           className="img-fluid rounded img-thumbnail"
//                         />{" "}
//                         <Link to={`/products/${cartItem.token}`}>
//                           {truncateTitle(cartItem.title)}
//                         </Link>
//                       </Col>
//                       <Col md={3}>
//                         <span className="ms-3">{cartItem.quantity}</span>
//                       </Col>
//                       <Col md={3}>
//                         &nbsp;&nbsp;&nbsp;&nbsp;$
//                         {cartItem.price * cartItem.quantity}
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//               <Link to="/cart">Edit Cart</Link>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Summary</Card.Title>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Items:</Col>
//                     <Col>${cart.itemsPrice.toFixed(2)}</Col>
//                   </Row>
//                   <Row>
//                     <Col>Shipping:</Col>
//                     <Col>${cart.shippingPrice.toFixed(2)}</Col>
//                   </Row>
//
//                   <Row>
//                     <Col>Tax:</Col>
//                     <Col>${cart.taxPrice.toFixed(2)}</Col>
//                   </Row>
//                   <br />
//                   <Row>
//                     <Col>Total:</Col>
//                     <Col>${cart.totalPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <div className="d-grid">
//                     <Button
//                       type="button"
//                       onClick={submitOrderHandler}
//                       color="primary"
//                       disabled={cartItems.length === 0}
//                     >
//                       Submit
//                     </Button>
//                     {loading && <Loading />}
//                   </div>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };
//
// export default SubmitOrderPage;

import { useContext, useEffect, useState } from "react";
import { Store } from "../store.jsx";
import { Link, useNavigate } from "react-router-dom";
import { CLEAR_CART } from "../actions.jsx";
import { toast } from "react-toastify";
import { getError } from "../../utils.js";
import Title from "../components/shared/Title.jsx";
import CheckoutSteps from "../components/shared/CheckoutSteps.jsx";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Loading from "../components/shared/Loading.jsx";
import axios from "axios";

const SubmitOrderPage = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { paymentMethod, cartItems, shippingAddress } = cart;
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/placeorder");
    }
    if (!shippingAddress) {
      navigate("/shipping");
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [cartItems, navigate, paymentMethod, userInfo, shippingAddress]);

  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        },
      );
      // more code to come here
      ctxDispatch({ type: CLEAR_CART });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0,
    ),
  );
  cart.taxPrice = round2(cart.itemsPrice * 0.17);
  cart.shippingPrice =
    cart.itemsPrice < 50
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const truncateTitle = (title) => {
    return title.length > 27 ? title.substring(0, 27) + "..." : title;
  };

  return (
    <div>
      <Title title="Order Summary" />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {shippingAddress.fullName}
                <br />
                <strong>Address: </strong>
                {shippingAddress.address}
                <br />
                <strong>Postal Code: </strong>
                {shippingAddress.postalCode}
                <br />
                <strong>Country: </strong>
                {shippingAddress.country}
                <br />
                <strong>City: </strong>
                {shippingAddress.city}
                <br />
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="ms-4">Items</Card.Title>
              <Row className="align-items-center mb-3 ms-2">
                <Col xs={6}>Description</Col>
                <Col xs={3}>Quantity</Col>
                <Col xs={3}>Total Price</Col>
              </Row>
              <ListGroup variant="flush">
                {cartItems.map((cartItem) => (
                  <ListGroup.Item key={cartItem._id}>
                    <Row className="align-items-center">
                      <Col xs={6}>
                        <img
                          src={cartItem.image}
                          alt={cartItem.title}
                          className="img-fluid rounded img-thumbnail"
                        />{" "}
                        <Link to={`/products/${cartItem.token}`}>
                          {truncateTitle(cartItem.title)}
                        </Link>
                      </Col>
                      <Col xs={3}>
                        <span className="ms-4">{cartItem.quantity}</span>
                      </Col>
                      <Col xs={3}>
                        <span className="ms-2">
                          ${cartItem.price * cartItem.quantity}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit Cart</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Total:</Col>
                    <Col>${cart.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={submitOrderHandler}
                      color="primary"
                      disabled={cartItems.length === 0}
                    >
                      Submit
                    </Button>
                    {loading && <Loading />}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrderPage;
