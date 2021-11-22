import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  Row,
  Col,
  Container,
} from "reactstrap";
import { slide as Menu } from "react-burger-menu";
import { logout } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedUserInfo = useSelector((state) => state.user.loggedUserInfo);

  useEffect(() => {
    if (loggedUserInfo) {
      setLoggedUser(loggedUserInfo.user);
    }
  }, [loggedUserInfo]);

  return (
    // <div className="header-container">
    <Container className="header-container">
      <Row>
        <Navbar color="light" expand="sm" light>
          <Col md={2}>
            <div>
              <Menu burgerButtonClassName={"category-menu"} width={"23%"}>
                <h4>Book Category</h4>
                <Link to="/book/action">Action</Link>
                <Link to="/book/classic">Classic</Link>
                <Link to="/book/history">History</Link>
              </Menu>{" "}
            </div>
            <h4>City Library</h4>
          </Col>

          <NavbarToggler className="me-2" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Col md={5}>
              <Nav navbar>
                <Link to="/">HOME </Link>

                {/* <div className="nav-link-custom-div">
                  <NavItem>
                    <Link to="/">HOME </Link>
                  </NavItem>
                </div> */}

                {/* <NavItem>
                  <Link to="/book/action">Action</Link>
                </NavItem>
                <NavItem>
                  <Link to="/book/classic">Classic</Link>
                </NavItem>
                <NavItem>
                  <Link to="/book/history">History</Link>
                </NavItem> */}
              </Nav>
            </Col>
            {!loggedUser ? (
              <div className="nav-lists">
                <div className="nav-link-custom-div">
                  <Link to="/login">
                    <Button color="secondary">Log in</Button>
                  </Link>
                </div>
                <div>
                  <Link to="/register">
                    <Button color="secondary">Register</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="nav-lists">
                <div className="nav-link-custom-div">
                  <NavItem>
                    <Link to="/my-books">MY BOOKS</Link>
                  </NavItem>
                </div>
                <div className="nav-link-custom-div">
                  <NavItem>
                    <Link to="/my-profile">MY PROFILE</Link>
                  </NavItem>
                </div>
                <div>
                  <Button
                    color="secondary"
                    onClick={() => {
                      dispatch(logout(localStorage));
                      setLoggedUser(null);
                      history.push("/");
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            )}
          </Collapse>
        </Navbar>
      </Row>
    </Container>
    // </div>
  );
};

export default NavBar;
