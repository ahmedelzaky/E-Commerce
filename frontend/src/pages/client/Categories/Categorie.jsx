import { useParams } from "react-router-dom";
import GetProducts from "../../../component/Product/GetProducts";
import { Container } from "react-bootstrap";
import ProductsFilter from "../../../component/Product/ProductsFilter";
import NavBar from "../../../component/NavBar/NavBar";

const CategoriesPage = () => {
  const { categoryName } = useParams();
  return (
    <NavBar>
      <div className="category-page" style={{ marginTop: "100px" }}>
        <Container>
          <h1> {categoryName} </h1>
          <ProductsFilter></ProductsFilter>
          <GetProducts url={`/products/category/${categoryName}`} />
        </Container>
      </div>
    </NavBar>
  );
};

export default CategoriesPage;
