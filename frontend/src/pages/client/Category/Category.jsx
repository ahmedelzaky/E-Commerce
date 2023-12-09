import "./category.css";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../../component/client/NavBar/NavBar";
import GetProducts from "../../../component/client/Product/GetProducts";
import ProductsFilter from "../../../component/client/Product/ProductsFilter";

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
