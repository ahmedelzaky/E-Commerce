import "./home.css";
import Categories from "../../../component/Categories/GetCategories";
import Slider from "../../../component/Slider";
import NavBar from "../../../component/NavBar/NavBar";

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
      </div>
    </NavBar>
  );
};

export default Home;
