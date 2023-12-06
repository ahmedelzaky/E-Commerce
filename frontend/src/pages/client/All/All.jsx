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
        <h1 className="mt-3"> All Products </h1>
        <ProductsFilter></ProductsFilter>
        <GetProducts url={"/products"}></GetProducts>
      </Container>
    </NavBar>
  );
};

export default Products;
