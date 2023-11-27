import "./categories.css";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import useAxios from "../../hooks/useAxios";
import { Col, Row } from "react-bootstrap";
import LoadingScreen from "../LoadingScreen";
import { Link } from "react-router-dom";
import { BiSolidErrorAlt } from "react-icons/bi";
import { motion } from "framer-motion";

const Categories = () => {
  const { data: categories, isPending, error } = useAxios("/categories");

  return (
    <Container>
      <Row>
        {isPending && <LoadingScreen />}
        {error && (
          <div className="error">
            <BiSolidErrorAlt className="error-icon" fontSize={"30px"} /> {error}
          </div>
        )}
        {categories &&
          categories.map((category) => (
            <Col key={category.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Categories;
