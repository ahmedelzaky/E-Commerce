import { Container } from "react-bootstrap";
import GetProducts from "./GetProducts";

const All = () => {
  return (
    <Container>
      <GetProducts url={process.env.REACT_APP_API + "products"}></GetProducts>
    </Container>
  );
};

export default All;
