import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../ErrorMessage";
import LoadingScreen from "../../LoadingScreen";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { addToCart } from "../../../rtk/slices/cart-slice";
import Suggestions from "./Suggestions";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { data: product, isLoading, error } = useAxios(`/products/${id}`);

  return (
    <>
      <div className="product-details">
        <Container>
          {error && <ErrorMessage> {error} </ErrorMessage>}
          {isLoading && <LoadingScreen />}
          {product && (
            <Row>
              <Col>
                <img
                  className="product-img"
                  src={product.image}
                  alt={product.title}
                />{" "}
              </Col>
              <Col className="product-info">
                <h2 className="product-title"> {product.title} </h2>
                <h4 className="product-price"> ${product.price} </h4>
                <p className="product-description"> {product.description} </p>

                <p> Qty </p>
                <div>
                  <input
                    type="number"
                    min="1"
                    max={product.stockQuantity}
                    defaultValue={qty}
                    onBlur={(e) => setQty(e.target.value)}
                  />
                  <br />
                  <Button
                    disabled={product.stockQuantity === 0}
                    variant="warning"
                    onClick={() => {
                      dispatch(addToCart({ ...product, qty: qty }));
                    }}
                  >
                    Add <FaShoppingCart />
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>

      <Container className="suggestions">
        {product && (
          <Suggestions category={product.category} currendId={product.id} />
        )}
      </Container>
    </>
  );
};

export default ProductDetails;
