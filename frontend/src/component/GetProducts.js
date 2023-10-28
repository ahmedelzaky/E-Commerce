import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "./UseFetch";
import { Col, Row } from "react-bootstrap";
import "./css/products.css";
import LoadingScreen from "./LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const GetProducts = ({ url }) => {
  const { data, isPending, error } = useFetch(url);
  return (
    <Row>
      {isPending && <LoadingScreen />}
      {error && <p>{error}</p>}
      {data &&
        data.map((product) => (
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
                  {product.title.length > 35
                    ? product.title.substring(0, 35) + "..."
                    : product.title}
                </Card.Title>
                <Card.Text>
                  {product.description.length > 80
                    ? product.description.substring(0, 80) + "..."
                    : product.description}
                </Card.Text>
                <p className="price">{product.price}$</p>
                <center>
                  <Button>
                    Add <FontAwesomeIcon icon={faCartShopping} />
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
