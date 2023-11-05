import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import useFetch from "../UseFetch";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";

const NavBar = () => {
  const { data: categories } = useFetch(
    process.env.REACT_APP_API + "categories"
  );
  const cart = useSelector((state) => state.cart);
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Link to={"/"}>
          <img
            src="images/512.png"
            alt="E-Commerce"
            style={{
              height: "62px",
              width: "62px",
            }}
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/all">
              Shop
            </Link>
            <Link className="nav-link" to="/cart">
              <BsCart4 size={"25px"} />{" "}
              {cart.length > 0 ? <Badge bg="warning">{cart.length}</Badge> : ""}
            </Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              {categories &&
                categories.map((category) => (
                  <Link
                    className="dropdown-item"
                    to={"/category/" + category.name}
                  >
                    {category.name}
                  </Link>
                ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
