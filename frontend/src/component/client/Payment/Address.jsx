import { Button, Card, Col, Collapse, Form, Row } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { USER } from "../../../api/auth";
import { useState } from "react";
import axios from "../../../api/axios";
import PropTypes from "prop-types";

const Address = ({ setAddressId, open, setError, setOpen }) => {
  const [countryId, setCountryId] = useState(0);
  const [pending, setPending] = useState(false);
  const { data: addresses } = useAxios(
    `/address/get-address-by-customer-id/${USER.id}`
  );
  const { data: countries } = useAxios("/countries");
  const { data: cities } = useAxios(
    `/cities/get-city-by-country-id/${countryId}`
  );
  const [address, setAddress] = useState({
    street: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  const handleAddAddress = async (address) => {
    setPending(true);
    const { street, postalCode, city, country } = address;
    const newAddress = {
      street,
      postalCode,
      cityId: city,
      countryId: country,
      customerId: USER.id,
    };
    try {
      await axios.post("/address", newAddress);
      window.location.reload();
    } catch (err) {
      console.log(err.response);
      setError(err.response.data);
    }
    setPending(false);
  };

  return (
    <Card className="address">
      <Card.Header>
        <h3>Shipping Address</h3>
      </Card.Header>
      <Card.Body>
        <div className="address-list">
          {addresses?.map((address) => (
            <div className="address-item" key={address.id}>
              <input
                type="radio"
                name="address"
                required
                id="address"
                onChange={() => setAddressId(address.id)}
                value={address.id}
              />
              <label htmlFor="address">
                {address.street}, {address.postalCode}, {address.cityName},{" "}
                {address.countryName}
              </label>
            </div>
          ))}
        </div>
        <Button className="add-address-btn mt-3" onClick={() => setOpen(true)}>
          Add New Address
        </Button>
        <Collapse in={open}>
          <Row>
            <Form.Group as={Col} md="6" className="mb-3" controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={address.street}
                onChange={handleInputChange}
                required={open}
                placeholder="Enter Street"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-3" controlId="postalCode">
              <Form.Label>postal code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleInputChange}
                required={open}
                placeholder="Enter Postal Code"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                required={open}
                placeholder="Enter City"
              >
                <option value="">Select a City</option>
                {cities &&
                  cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={address.country}
                onChange={(e) => {
                  setCountryId(e.target.value);
                  handleInputChange(e);
                }}
                required={open}
                placeholder="Enter Country"
              >
                <option value="">Select a Country</option>
                {countries &&
                  countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="12" className="mb-3">
              <center>
                <Button
                  style={{ width: "100px" }}
                  disabled={pending}
                  onClick={() => {
                    handleAddAddress(address);
                  }}
                >
                  {pending ? "Loading..." : "Add"}
                </Button>
              </center>
            </Form.Group>
          </Row>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

Address.propTypes = {
  setAddressId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Address;
