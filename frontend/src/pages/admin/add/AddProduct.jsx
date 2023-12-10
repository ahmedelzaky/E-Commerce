import { useState } from "react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import uploadProduct from "../../../api/Server";
import ErrorMessage from "../../../component/ErrorMessage";
import { motion } from "framer-motion";
import New from "../../../component/admin/new/New";

const AddProduct = () => {
  const { data: categories } = useAxios("/categories");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(true);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    stockQuantity: "",
    categoryId: "",
    imageUrl: "",
    rating: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product", JSON.stringify(product));
    setIsPending(true);
    const { Pending, error } = await uploadProduct(formData);
    setError(error);
    if (!error) {
      setSuccess("Product added successfully");
      setShow(true);
    } else {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setIsPending(Pending);
  };

  return (
    <New title="Add New Product">
      <div className="d-flex flex-column">
        <Form onSubmit={handleSubmit}>
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
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="product"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Form.Group>
          </Row>

          <Button
            className="mt-3"
            variant="primary"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </Form>
        {error && <ErrorMessage> {error} </ErrorMessage>}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Alert show={show} className="mt-3" variant="success">
              <Alert.Heading> {success} </Alert.Heading>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    setShow(false);
                    setSuccess(null);
                  }}
                  variant="outline-success"
                >
                  Close me
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}
      </div>
    </New>
  );
};

export default AddProduct;
