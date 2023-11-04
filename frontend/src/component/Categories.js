import "./css/categories.css";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import useFetch from "./UseFetch";
import { Col, Row } from "react-bootstrap";
import "./css/products.css";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router-dom";
const Categories = () => {
  const {
    data: categories,
    isPending,
    error,
  } = useFetch(process.env.REACT_APP_API + "categories");

  return (
    <Container>
      <Row>
        {isPending && <LoadingScreen />}
        {error && <p>{error}</p>}
        {categories &&
          categories.map((category) => (
            <Col key={category.id}>
              <Card className="category">
                <center>
                  <Card.Img
                    variant="top"
                    src={`images/${category.name}.jpg`}
                    style={{
                      height: "400px",
                    }}
                  />
                </center>
                <Card.Body>
                  <Card.Title>
                    <Link to={"/category/" + category.name}>
                      {category.name}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quo hic voluptate in, ad rerum veritatis officiis porro
                    quos! Tenetur accusantium nihil alias rem
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Categories;
