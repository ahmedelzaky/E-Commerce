import { Container } from "react-bootstrap";
import Categories from "./Categories";
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
          }}
        />
      )}
      {console.log(window.screen.width)}
      <Container>
        <Categories />
      </Container>
    </div>
  );
};

export default Home;
