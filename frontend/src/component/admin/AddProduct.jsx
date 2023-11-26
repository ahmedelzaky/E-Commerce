import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import uploadProduct from "../../api/Server";
import ErrorMessage from "../ErrorMessage";

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
    stockQuantity: 15,
    categoryId: 1,
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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product", JSON.stringify(product));
    setIsPending(true);
    const { isPending, error } = await uploadProduct(formData);
    setError(error);
    if (!error) {
      setSuccess("Product added successfully");
    }
    setIsPending(isPending);
  };

  return (
    <div style={{ padding: "80px" }}>
      <h2>Product Form</h2>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Product title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            required
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="text"
            name="price"
            required
            value={product.price}
            onChange={handleInputChange}
          />
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

        <Form.Select aria-label="Default select example" className="mt-3 mb-3">
          <option>choose a category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Form.Select>
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

        <Button
          className="mt-3"
          variant="primary"
          disabled={isPending}
          type="button"
          onClick={handleUpload}
        >
          Add Product
        </Button>
      </Form>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      {success && (
        <>
          <Alert show={show} className="mt-3" variant="success">
            <Alert.Heading> {success} </Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close me
              </Button>
            </div>
          </Alert>
        </>
      )}
    </div>
  );
};

export default AddProduct;
