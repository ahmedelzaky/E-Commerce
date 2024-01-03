import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";
import LoadingScreen from "../../LoadingScreen";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "react-bootstrap";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Suggestions = ({ category, currendId }) => {
  const { data: products, isLoading } = useAxios(
    `/products/category/${category}`
  );
  return (
    <>
      <h2>Suggestions For You</h2>
      {isLoading && <LoadingScreen />}
      {products && (
        <Carousel responsive={responsive}>
          {products
            .filter((product) => product.id !== currendId)
            .map((product) => (
              <Card key={product.id}>
                <center>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>
                      <a href={`/product/${product.id}`}>
                        {product.title.length < 40
                          ? product.title
                          : product.title.slice(0, 40) + "..."}
                      </a>
                    </Card.Title>
                  </Card.Body>
                </center>
              </Card>
            ))}
        </Carousel>
      )}
    </>
  );
};

Suggestions.propTypes = {
  category: PropTypes.string.isRequired,
  currendId: PropTypes.number.isRequired,
};

export default Suggestions;
