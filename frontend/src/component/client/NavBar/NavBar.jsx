import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const NavBar = ({ children }) => {
  const { data: categories } = useAxios("/categories");
  const cart = useSelector((state) => state.cart);
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += Number(item.qty);
    });
    setProductCount(count);
  }, [cart]);
  return (
    <>
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
                {cart.length > 0 ? (
                  <Badge bg="warning">{productCount}</Badge>
                ) : (
                  ""
                )}
              </Link>
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                {categories &&
                  categories.map((category) => (
                    <Link
                      key={category.id}
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
      {children}
    </>
  );
};

NavBar.propTypes = {
  children: PropTypes.node,
};

export default NavBar;
