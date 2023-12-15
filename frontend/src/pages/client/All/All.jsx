import { Container } from "react-bootstrap";
import NavBar from "../../../component/client/NavBar/NavBar";
import GetProducts from "../../../component/client/Product/GetProducts";
import ProductsFilter from "../../../component/client/Product/ProductsFilter";

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
