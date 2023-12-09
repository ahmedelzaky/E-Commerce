import "./cart.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, update } from "../../../rtk/slices/cart-slice";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import NavBar from "../../../component/client/NavBar/NavBar";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const handleQuantityChange = (e, itemId) => {
    if (e.target.value <= 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(update({ id: itemId, qty: e.target.value }));
    }
  };
  const handlePayment = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  const subtotal = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toFixed(2);
  }, [cart]);

  return (
    <NavBar>
      <div
        className="cart"
        style={{
          paddingTop: "80px",
        }}
      >
        <Container>
          <form onSubmit={handlePayment} className="d-flex ">
            <div className="items p-4">
              <h1>Shopping Cart</h1>
              <hr />
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id}>
                    <div className="item">
                      <div className="pe-3">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="details pt-4">
                        <h4>
                          <Link to={`/product/${item.id}`}>{item.title}</Link>
                        </h4>
                        <h5 className="mt-2"> ${item.price.toFixed(2)}</h5>
                        {item.stockQuantity > 0 ? (
                          item.stockQuantity > 10 ? (
                            <p className="in-stock">in Stock</p>
                          ) : (
                            <p className="med-stock">
                              There is {item.stockQuantity} left
                            </p>
                          )
                        ) : (
                          <p className="out-stock">Out OF Stock</p>
                        )}
                        <Row className="actions">
                          <Col>
                            <label htmlFor="">Qty</label>
                            <input
                              type="number"
                              defaultValue={item.qty}
                              min={1}
                              max={item.stockQuantity}
                              required
                              onBlur={(e) => handleQuantityChange(e, item.id)}
                            />
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            {cart.length > 0 && (
              <div className="payment p-4">
                <h5> Subtotal :{subtotal}$</h5>
                <input
                  type="submit"
                  value="Proceed to checkout"
                  className="mt-3 btn btn-warning"
                />
              </div>
            )}
          </form>
        </Container>
      </div>
    </NavBar>
  );
};

export default Cart;
