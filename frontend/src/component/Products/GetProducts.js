import "./products.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "../UseFetch";
import { Col, Row } from "react-bootstrap";
import LoadingScreen from "../LoadingScreen";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../rtk/slices/cart-slice";
import { FaShoppingCart } from "react-icons/fa";

const GetProducts = ({ url }) => {
  const { data: products, isPending, error } = useFetch(url);
  const dispatch = useDispatch();
  return (
    <Row>
      {isPending && <LoadingScreen />}
      {error && <p>{error}</p>}
      {products &&
        products.map((product) => (
          <Col key={product.id}>
            <Card className="product-item">
              <center>
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    height: "250px",
                    width: "250px",
                  }}
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
                {/* <Card.Text>
                  {product.description.length > 80
                    ? product.description.substring(0, 80) + "..."
                    : product.description}
                </Card.Text> */}
                <p className="price">{product.price}$</p>
                <center>
                  <Button
                    variant="warning"
                    onClick={() => {
                      dispatch(addToCart(product));
                    }}
                  >
                    Add <FaShoppingCart />
                  </Button>
                </center>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default GetProducts;
