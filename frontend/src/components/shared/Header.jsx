import "./Header.css"; // Import the custom CSS file
import { Navbar, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";
import { Store } from "../../store.jsx";
import { useContext } from "react";
import { USER_SIGNOUT } from "../../actions.jsx";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems } = cart; // Correctly destructure cartItems from cart object
  const navigate = useNavigate();
  const location = useLocation();

  const signoutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link onClick={() => navigate(-1)}>
            {location.pathname !== "/" && (
              <i className="fa fa-arrow-left text-white align-arrow-right"></i>
            )}
          </Link>
          <Link to="/">
            <Navbar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazon logo"
              />
            </Navbar.Brand>{" "}
          </Link>
          <SearchBox />
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
            <Link to="/cart" className="nav-link me-2">
              <i className="fa fa-shopping-cart text-white"></i>

              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </nav>
          {userInfo ? (
            <NavDropdown
              className="text-white"
              title={userInfo.name}
              id="basic-nav-dropdown"
            >
              <Link to="/profile" className="dropdown-link">
                User Profile
              </Link>
              <Link to="/orderhistory" className="dropdown-link">
                Order History
              </Link>
              <NavDropdown.Divider />
              <Link
                to="#signout"
                onClick={signoutHandler}
                className="dropdown-link"
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <NavDropdown
              className="text-white"
              id="basic-nav-dropdown"
              title=""
            >
              <Link
                to="/signin"
                onClick={signoutHandler}
                className="dropdown-link"
              >
                Sign in
              </Link>
              <NavDropdown.Divider />
              <Link to="/signup" className="dropdown-link">
                Sign up
              </Link>
            </NavDropdown>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
