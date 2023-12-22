import { Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Order = () => {
  const cart = useSelector((state) => state.cart);

  return (
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
                <td>${(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="total">
          <h5>
            Total: $
            {cart
              ?.reduce((total, item) => total + item.price * item.qty, 0)
              .toFixed(2)}
          </h5>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Order;
