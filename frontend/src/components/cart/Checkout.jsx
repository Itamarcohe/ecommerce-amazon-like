import { Card, ListGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Checkout = ({ cartItems, checkOutHandler }) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>
              {/* Counts the items in cart */}
              Subtotal ({cartItems.reduce(
                (acc, cur) => acc + cur.quantity,
                0,
              )}{" "}
              Items): $
              {cartItems
                .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
                .toFixed(2)}
            </h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                type="button"
                variant="primary"
                onClick={() => checkOutHandler()}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
Checkout.propTypes = {
  cartItems: PropTypes.array,
  checkOutHandler: PropTypes.func,
};

export default Checkout;
