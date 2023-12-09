import "./navbar.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart4 } from "react-icons/bs";
import NavDropdown from "react-bootstrap/NavDropdown";
import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Collapse, Row } from "react-bootstrap";
import axios from "../../../api/axios";

const NavBar = ({ children }) => {
  const { data: categories } = useAxios("/categories");
  const cart = useSelector((state) => state.cart);
  const [productCount, setProductCount] = useState(0);
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
  const ref = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    async function getSerch() {
      const res = await axios.get(`/products/search/${searchText}`);
      setProducts(res.data);
      console.log(res.data);
    }
    if (searchText.length > 0) getSerch();
    else setProducts(null);
  }, [searchText]);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const visible = prevScrollpos > currentScrollPos;
    setPrevScrollpos(currentScrollPos);
    if (ref.current) {
      ref.current.style.top = visible ? "0" : "-100px";
    }
  }, [prevScrollpos, ref]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const count = cart.reduce((total, item) => total + Number(item.qty), 0);
    setProductCount(count);
  }, [cart]);

  return (
    <>
      <Navbar ref={ref} expand="lg" className="bg-body-tertiary" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"}>
              <img src="/images/512.png" alt="E-Commerce" className="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
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
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                {categories &&
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      className="dropdown-item"
                      to={"/category/" + category.name}
                      style={{ textTransform: "capitalize" }}
                    >
                      {category.name}
                    </Link>
                  ))}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearch}
                onFocus={() => setOpen(true)}
                onBlur={() => {
                  setOpen(false);
                }}
              />
              {products && (
                <Collapse className="search-body" in={open}>
                  <div>
                    {products.map((product) => (
                      <Row key={product.id}>
                        <Link
                          to={`/product/${product.id}`}
                          className="d-flex serch-details"
                        >
                          <img src={product.image} alt="product.title" />
                          <p>{product.title}</p>
                        </Link>
                        <hr />
                      </Row>
                    ))}
                    {products.length === 0 && (
                      <p className="text-center">No results found</p>
                    )}
                  </div>
                </Collapse>
              )}
            </Form>
            <Link className="btn btn-warning login-btn" to={`/sign-in`}>
              Signin
            </Link>
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
