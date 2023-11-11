import "./home.css";
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
            width: "100%",
          }}
        />
      )}
      <Categories />
    </div>
  );
};

export default Home;
