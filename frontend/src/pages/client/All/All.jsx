import { Container } from "react-bootstrap";
import GetProducts from "../../../component/Product/GetProducts";
import ProductsFilter from "../../../component/Product/ProductsFilter";
import NavBar from "../../../component/NavBar/NavBar";

const Products = () => {
  return (
    <NavBar>
      <Container
        style={{
          paddingTop: "80px",
        }}
      >
        <ProductsFilter></ProductsFilter>
        <GetProducts url={"/products"}></GetProducts>
      </Container>
    </NavBar>
  );
};

export default Products;
