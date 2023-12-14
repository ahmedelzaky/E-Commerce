import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import "./payment.css";
import { USER } from "../../../api/auth";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../../../component/LoadingScreen";
import NavBar from "../../../component/client/NavBar/NavBar";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const PAYMENT_METHODS = {
  CASH: "CASH",
};

const Payment = () => {
  const [payment, setPayment] = useState(PAYMENT_METHODS.CASH);
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [addressId, setAddressId] = useState("");

  const { data: customer, isPending } = useAxios(`/customers/${USER.id}`);
  const { data: addresses } = useAxios(
    `/address/get-address-by-customer-id/${USER.id}`
  );
  const { data: countries } = useAxios("/countries");
  const { data: cities } = useAxios("/cities");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  const handleAddAddress = async (address) => {
    const { street, postalCode, city, country } = address;
    const newAddress = {
      street,
      postalCode,
      cityId: city,
      countryId: country,
      customerId: USER.id,
    };
    try {
      const res = await axios.post("/address", newAddress);
      if (res.status === 200) {
        window.location.reload();
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckOut = async () => {
    const paymentSchema = {
      paymentMethod: payment,
      amount: cart?.reduce((total, item) => total + item.price * item.qty, 0),
      order: {
        customerId: USER.id,
        addressId,
        orderItems: cart.map((item) => ({
          productId: item.id,
          quantity: item.qty,
        })),
      },
    };
    try {
      const res = await axios.post("/payment/pay", paymentSchema);
      if (res.status === 200) {
        localStorage.removeItem("cart");
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavBar>
      <div className="payment-page">
        {!isPending ? (
          <Container>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckOut();
              }}
            >
              <center>
                <h1>Check Out</h1>
              </center>
              <Card className="customer">
                <Card.Header>
                  <h3>Customer Details</h3>
                </Card.Header>
                <Card.Body>
                  <div className="customer-details">
                    <h6>
                      Name:{" "}
                      <span>
                        {customer?.firstName + " " + customer?.lastName}
                      </span>
                    </h6>
                    <h6>
                      Email: <span>{customer?.email}</span>
                    </h6>
                    <h6>
                      Phone: <span>{customer?.phone}</span>
                    </h6>
                  </div>
                </Card.Body>
              </Card>

              <Card className="order">
                <Card.Header>
                  <h3>Order Details</h3>
                </Card.Header>
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.qty}</td>
                          <td>${item.price}</td>
                          <td>${item.price * item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="total">
                    <h5>
                      Total: $
                      {cart?.reduce(
                        (total, item) => total + item.price * item.qty,
                        0
                      )}
                    </h5>
                  </div>
                </Card.Body>
              </Card>

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
                          {address.street}, {address.postalCode},{" "}
                          {address.cityName}, {address.countryName}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="add-address-btn mt-3"
                    onClick={() => setOpen(true)}
                  >
                    Add New Address
                  </Button>
                  <Collapse in={open}>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddAddress(address);
                      }}
                    >
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          className="mb-3"
                          controlId="street"
                        >
                          <Form.Label>Street</Form.Label>
                          <Form.Control
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Street"
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          className="mb-3"
                          controlId="postalCode"
                        >
                          <Form.Label>postal code</Form.Label>
                          <Form.Control
                            type="text"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Postal Code"
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          className="mb-3"
                          controlId="city"
                        >
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            as="select"
                            name="city"
                            value={address.city}
                            onChange={handleInputChange}
                            required
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
                        <Form.Group
                          as={Col}
                          md="6"
                          className="mb-3"
                          controlId="country"
                        >
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            as="select"
                            name="country"
                            value={address.country}
                            onChange={handleInputChange}
                            required
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
                            <Button style={{ width: "100px" }} type="submit">
                              Add
                            </Button>
                          </center>
                        </Form.Group>
                      </Row>
                    </Form>
                  </Collapse>
                </Card.Body>
              </Card>
              <Card className="payment">
                <Card.Header>
                  <h3>Payment Method</h3>
                </Card.Header>
                <Card.Body>
                  <div className="payment-method">
                    <div className="method">
                      <input
                        type="radio"
                        name="payment"
                        id="payment"
                        value={PAYMENT_METHODS.CASH}
                        checked={payment === PAYMENT_METHODS.CASH}
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <label htmlFor="payment">Cash</label>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="checkout">
                <center>
                  <Button type="submit" className="checkout-btn">
                    Checkout
                  </Button>
                </center>
              </div>
            </Form>
          </Container>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </NavBar>
  );
};

export default Payment;
