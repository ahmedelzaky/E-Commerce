import { Button, Col, Form, Row } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProductForm = ({ handleSubmit, isPending, productData }) => {
  const { data: categories } = useAxios("/categories");
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    stockQuantity: "",
    categoryId: "",
    imageUrl: "",
    rating: "",
  });

  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(product, file);
      }}
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="8" controlId="formTitle">
          <Form.Label>Product title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            required
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min={0}
            name="price"
            required
            value={product.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formRating">
          <Form.Label>Rating:</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            name="rating"
            min={0}
            max={5}
            value={product.rating}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formStockQuantity">
          <Form.Label>Stock Quantity:</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="stockQuantity"
            required
            value={product.stockQuantity}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formCategory">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            required
            value={product.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Select a Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description}
            required
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Select Image:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
          <center>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="product"
                style={{
                  width: "300px",
                  height: "200px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
              />
            )}
          </center>
        </Form.Group>
      </Row>
      <center>
        <Button
          className="mt-3"
          variant="primary"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Submiting..." : "Submit"}
        </Button>
      </center>
    </Form>
  );
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  productData: PropTypes.object,
};

export default ProductForm;
