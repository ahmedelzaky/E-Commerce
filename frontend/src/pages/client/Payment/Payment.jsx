import { Button, Card, Container, Form } from "react-bootstrap";
import "./payment.css";
import { USER } from "../../../api/auth";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../component/LoadingScreen";
import NavBar from "../../../component/client/NavBar/NavBar";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../component/ErrorMessage";
import Order from "../../../component/client/Payment/Order";
import Address from "../../../component/client/Payment/Address";
import { clearCart } from "../../../rtk/slices/cart-slice";

const PAYMENT_METHODS = {
  CASH: "CASH",
};

const Payment = () => {
  const [payment, setPayment] = useState(PAYMENT_METHODS.CASH);
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [pendingPay, setPendingPay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addressId, setAddressId] = useState("");

  const { data: customer, isPending } = useAxios(`/customers/${USER.id}`);

  const handleCheckOut = async () => {
    setPendingPay(true);
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
      await axios.post("/payment/pay", paymentSchema);
      localStorage.removeItem("cart");
      dispatch(clearCart());
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
    setPendingPay(false);
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

              <Order />

              <Address
                setAddressId={setAddressId}
                open={open}
                setError={setError}
                setOpen={setOpen}
              />

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
                  <Button
                    type="submit"
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="checkout-btn"
                    disabled={pendingPay}
                  >
                    {pendingPay ? "Loading..." : "Check Out"}
                  </Button>
                </center>
              </div>
            </Form>
          </Container>
        ) : (
          <LoadingScreen />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </NavBar>
  );
};

export default Payment;
