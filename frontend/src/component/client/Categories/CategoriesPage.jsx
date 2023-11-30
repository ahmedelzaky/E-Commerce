import { useParams } from "react-router-dom";
import GetProducts from "../Products/GetProducts";
import { Container } from "react-bootstrap";
import ProductsFilter from "../Products/ProductsFilter";

const CategoriesPage = () => {
  const { categoryName } = useParams();
  return (
    <div className="category-page" style={{ marginTop: "100px" }}>
      <Container>
        <h1> {categoryName} </h1>
        <ProductsFilter></ProductsFilter>
        <GetProducts url={`/products/category/${categoryName}`} />
      </Container>
    </div>
  );
};

export default CategoriesPage;
