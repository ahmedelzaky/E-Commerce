import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const CategoryForm = ({ handleSubmit, categoryData, isPending }) => {
  const [category, setCategory] = useState({
    name: "",
  });

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
  }, [categoryData]);

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
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
        handleSubmit(category, file);
      }}
    >
      <Row className="mb-3">
        <Form.Group controlId="formTitle">
          <Form.Label>Category name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={category.name}
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

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  categoryData: PropTypes.object,
  isPending: PropTypes.bool.isRequired,
};

export default CategoryForm;
