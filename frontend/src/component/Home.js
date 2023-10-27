import { Container } from "react-bootstrap";
import GetProducts from "./GetProducts";

const Home = () => {
  return (
    <Container>
      <GetProducts
        url={process.env.REACT_APP_LOCAL_API + "products"}
      ></GetProducts>
    </Container>
  );
};

export default Home;
