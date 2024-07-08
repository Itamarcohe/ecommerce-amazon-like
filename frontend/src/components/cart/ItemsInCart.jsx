import PropTypes from "prop-types";
import MessageBox from "../shared/MessageBox.jsx";
import { Link } from "react-router-dom";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

const ItemsInCart = ({ cartItems, updateCartHandler }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your Cart is Empty. <Link to="/">Go back to home</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    className="img-fluid rounded img-thumbnail"
                    src={item.image}
                    alt={item.title}
                    width="100%"
                  />
                  <Link to={`/products/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    variant="light"
                    name="minusButton"
                    disabled={item.quantity === 1}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    variant="light"
                    name="plusButton"
                    disabled={item.quantity === item.countInStock}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  {/*<Button*/}
                  {/*  onClick={() => removeProductHandler(item, item.quantity - 1)}*/}
                  {/*  variant="light"*/}
                  {/*  name="plusButton"*/}
                  {/*  disabled={item.quantity === item.countInStock}*/}
                  {/*>*/}
                  {/*  <i className="fas fa-plus-circle"></i>*/}
                  {/*</Button>*/}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
};

export default ItemsInCart;
