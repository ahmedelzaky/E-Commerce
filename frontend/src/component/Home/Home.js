import "./home.css";
import { Container } from "react-bootstrap";
import Categories from "../Categories/Categories";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="home">
      {window.screen.width > 768 ? (
        <Slider />
      ) : (
        <img
          src="images/mobile.jpg"
          alt=""
          style={{
            height: "700px",
            width: "100%",
          }}
        />
      )}
      <Container>
        <Categories />
      </Container>
    </div>
  );
};

export default Home;
