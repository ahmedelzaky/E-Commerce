import "./products.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useAxios from "../../../hooks/useAxios";
import { Col, Row } from "react-bootstrap";
import LoadingScreen from "../../LoadingScreen";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../rtk/slices/cart-slice";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types";
import ErrorMessage from "../../ErrorMessage";
import AddedPopup from "./AddedPopup";

const GetProducts = ({ url }) => {
  const { data: products, isPending, error } = useAxios(url);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const pageNumbers = [];

  let currentProducts = [];

  if (products)
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (products)
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleAddToCart = (product) => {
    setShow(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setShow(false);
    }, 800);
  };

  return (
    <>
      <Row id="#top">
        {isPending && <LoadingScreen />}
        {error && <ErrorMessage> {error} </ErrorMessage>}
        {products && products.length === 0 && (
          <ErrorMessage> No products found </ErrorMessage>
        )}
        {show && <AddedPopup />}
        {products &&
          currentProducts.map((product) => (
            <Col key={product.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="product-item">
                  <center>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{
                        height: "250px",
                        width: "250px",
                      }}
                      loading="lazy"
                    />
                  </center>
                  <Card.Body>
                    <Card.Title>
                      <Link to={"/product/" + product.id}>
                        {product.title.length > 35
                          ? product.title.substring(0, 35) + "..."
                          : product.title}
                      </Link>
                    </Card.Title>
                    <p className="price">{product.price}$</p>
                    <center>
                      <Button
                        disabled={product.stockQuantity === 0}
                        variant="warning"
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        Add <FaShoppingCart />
                      </Button>
                    </center>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
      </Row>

      {products && (
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="#top"
                onClick={() => handlePageClick(number)}
                className={
                  currentPage === number
                    ? " btn page-link active"
                    : " btn page-link "
                }
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

GetProducts.propTypes = {
  url: PropTypes.string.isRequired,
};

export default GetProducts;
