import "./category.css";
import { useParams } from "react-router-dom";
import GetProducts from "../../../component/Product/GetProducts";
import { Container } from "react-bootstrap";
import ProductsFilter from "../../../component/Product/ProductsFilter";
import NavBar from "../../../component/NavBar/NavBar";

const Category = () => {
  const { categoryName } = useParams();
  return (
    <NavBar>
      <div className="category-page">
        <Container>
          <h1 className="category-name"> {categoryName} </h1>
          <ProductsFilter></ProductsFilter>
          <GetProducts url={`/products/category/${categoryName}`} />
        </Container>
      </div>
    </NavBar>
  );
};

export default Category;
