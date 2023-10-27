import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useFetch from "./UseFetch";
import { Col, Row } from "react-bootstrap";
import "./css/products.css";

const GetProducts = ({ url }) => {
  const { data, isPending } = useFetch(url);
  return (
    <Row>
      {isPending && <p> lodaing... </p>}
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
                <Card.Title style={{ height: "60px", overflow: "hidden" }}>
                  {product.title}
                </Card.Title>
                <Card.Text>
                  {product.description.length > 80
                    ? product.description.substring(0, 80)
                    : product.description}
                </Card.Text>
                <center>
                  <Button variant="primary">{product.price}$</Button>
                </center>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default GetProducts;
