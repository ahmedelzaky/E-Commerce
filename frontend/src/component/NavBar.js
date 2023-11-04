import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import useFetch from "./UseFetch";

const NavBar = () => {
  const { data: categories } = useFetch(
    process.env.REACT_APP_API + "categories"
  );
  console.log(categories);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/all">All</Nav.Link>
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
