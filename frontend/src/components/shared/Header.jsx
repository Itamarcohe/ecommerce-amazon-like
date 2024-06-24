import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";

const Header = () => {
    return(
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to='/'>
                        <Navbar.Brand>
                            <img
                                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                                width={80}
                                alt="Amazon logo"
                            />
                        </Navbar.Brand>
                    </Link>
                    {/*<SearchBox />*/}
                    <SearchBox />
                    <div className="d-flex align-items-center justify-content-between">

                        <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
                            <Link to="/cart" className="nav-link">
                                <i className="fas fa-shopping-cart text-white"></i>
                                {/*{badge of number}*/}
                            </Link>
                        </nav>
                        <Link className="nav-link text-white ms-4" to="/signin">Sign in</Link>
                    </div>

                    {/*Todo Deal with users*/}
                </Container>
            </Navbar>
        </header>
)
}

export default Header;