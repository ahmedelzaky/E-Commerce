import { Container } from "react-bootstrap";
import GetProducts from "./GetProducts";

const Products = () => {
  return (
    <Container
      style={{
        paddingTop: "80px",
      }}
    >
      <GetProducts url={"/products"}></GetProducts>
    </Container>
  );
};

export default Products;
