import Categories from "../../../component/client/Categories/GetCategories";
import NavBar from "../../../component/client/NavBar/NavBar";
import GetProducts from "../../../component/client/Product/GetProducts";
import Slider from "../../../component/Slider";
import "./home.css";

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
