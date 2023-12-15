import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useState({
    sortBy: "",
    min: 0,
    max: 999999,
  });

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        [name]: value,
      };
      handleNavigate(updatedParams);
      return updatedParams;
    });
  };

  const handleNavigate = (params) => {
    if (params.sortBy != "")
      navigate(
        `${location.pathname}?sortBy=${params.sortBy}&min=${params.min}&max=${params.max}`
      );
    else navigate(`${location.pathname}?min=${params.min}&max=${params.max}`);
  };

  return (
    <div className="filter">
      <Row>
        <Form.Group
          className="justify-content-end"
          as={Col}
          md="2"
          controlId="sort"
        >
          <Form.Label>Sort By:</Form.Label>
          <Form.Control as="select" name="sortBy" onChange={handleFilter}>
            <option value="">Defuault</option>
            <option value="id&order=desc">Latest</option>
            <option value="id">Oldest</option>
            <option value="price">Price (low - high)</option>
            <option value="price&order=desc">Price (high - low)</option>
            <option value="title">Title (A - Z)</option>
            <option value="title&order=desc">Title (Z - A)</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="1" controlId="min">
          <Form.Label>Min:</Form.Label>

          <Form.Control
            name="min"
            type="number"
            defaultValue={0}
            onBlur={handleFilter}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="1" controlId="max">
          <Form.Label>Max:</Form.Label>

          <Form.Control
            name="max"
            type="number"
            onBlur={handleFilter}
            defaultValue={99999}
          ></Form.Control>
        </Form.Group>
      </Row>
    </div>
  );
};

export default ProductsFilter;
