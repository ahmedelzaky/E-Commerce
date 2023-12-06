import "./home.css";
import Categories from "../../../component/Categories/GetCategories";
import Slider from "../../../component/Slider";
import NavBar from "../../../component/NavBar/NavBar";
import GetProducts from "../../../component/Product/GetProducts";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <NavBar>
      <div className="home">
        {window.screen.width > 768 ? (
          <Slider />
        ) : (
          <img
            src="images/mobile.jpg"
            alt=""
            style={{
              width: "100%",
            }}
          />
        )}
        <Categories />
        <Container className="top-selling">
          <h2>Top Selling</h2>
          <GetProducts url={`/products/top-selling`}></GetProducts>
        </Container>
      </div>
    </NavBar>
  );
};

export default Home;
