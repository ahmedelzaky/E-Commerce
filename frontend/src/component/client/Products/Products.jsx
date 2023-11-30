import { Container } from "react-bootstrap";
import GetProducts from "./GetProducts";
import ProductsFilter from "./ProductsFilter";

const Products = () => {
  return (
    <Container
      style={{
        paddingTop: "80px",
      }}
    >
      <ProductsFilter></ProductsFilter>
      <GetProducts url={"/products"}></GetProducts>
    </Container>
  );
};

export default Products;
