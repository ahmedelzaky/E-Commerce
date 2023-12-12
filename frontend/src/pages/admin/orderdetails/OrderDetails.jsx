import { useParams } from "react-router-dom";
import MainContainer from "../../../component/admin/new/MainContainer";
import useAxios from "../../../hooks/useAxios";
import LoadingScreen from "../../../component/LoadingScreen";
import ErrorMessage from "../../../component/ErrorMessage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./orderdetails.css";
import { Button } from "@mui/material";
import { updateOrderStatus } from "../../../api/Server";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    data: order,
    isPending,
    error,
  } = useAxios(`/orders/get-order-details-by-id/${orderId}`);
  const { data: cart } = useAxios(`/cart/${orderId}`);
  console.log(cart);

  return (
    <MainContainer title={`Order #${orderId} Details`}>
      <div className="order-details">
        {isPending && <LoadingScreen />}
        {error && <ErrorMessage> {error}</ErrorMessage>}

        {order && (
          <>
            <h5>Customer Details</h5>
            <ul>
              <li>
                Customer :
                <span> {order.firstName + " " + order.lastName} </span>{" "}
              </li>
              <li>
                Phone : <span>{order.phone}</span>
              </li>
              <hr />
              <li className="address">
                <h5>Address</h5>
                <ul>
                  <li>
                    Country : <span>{order.countryName}</span>{" "}
                  </li>
                  <li>
                    City : <span>{order.cityName}</span>{" "}
                  </li>
                  <li>
                    Street : <span>{order.street}</span>
                  </li>
                  <li>
                    PostalCode : <span>{order.postalCode}</span>
                  </li>
                </ul>
                <hr />
                <li>
                  {" "}
                  Order Date :{" "}
                  <span> {new Date(order.orderDate).toUTCString()} </span>
                </li>
                {order?.arrivalDate && (
                  <li>
                    {" "}
                    Arrival Date :{" "}
                    <span> {new Date(order?.arrivalDate).toUTCString()} </span>
                  </li>
                )}
              </li>
              <hr />
              <li>
                {" "}
                Payment Method : <span>{order.paymentMethod}</span>
              </li>
              <li>
                {" "}
                Subtotal : $<span>{order.amount}</span>
              </li>
              <li>
                {" "}
                Status :{" "}
                <span
                  className={`status ${
                    order.statue == "COMPLETED" ? "Approved" : "Pending"
                  }`}
                >
                  {order.statue}
                </span>
              </li>
            </ul>
            <hr />

            <h2>Cart</h2>
            {cart && (
              <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell">ID </TableCell>
                      <TableCell className="tableCell">Image</TableCell>
                      <TableCell className="tableCell">Product Title</TableCell>
                      <TableCell className="tableCell">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="tableCell">#{item.id}</TableCell>
                        <TableCell className="tableCell">
                          <img
                            src={item.image}
                            style={{ height: "60px", width: "60px" }}
                            alt=""
                          />
                        </TableCell>
                        <TableCell className="tableCell">
                          {item.title}
                        </TableCell>
                        <TableCell className="tableCell">
                          {item.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
        <center>
          {order?.statue == "PENDING" && (
            <div className="actions">
              <Button
                onClick={() => updateOrderStatus(orderId, "IN_PROGRESS")}
                variant="outlined"
              >
                Accept
              </Button>
              <Button
                onClick={() => updateOrderStatus(orderId, "CANCELLED")}
                variant="outlined"
                color="error"
              >
                Reject
              </Button>
            </div>
          )}
          {order?.statue == "IN_PROGRESS" && (
            <div className="actions">
              <Button
                onClick={() => updateOrderStatus(orderId, "COMPLETED")}
                variant="outlined"
                color="success"
              >
                Approve
              </Button>
              <Button
                onClick={() => updateOrderStatus(orderId, "CANCELLED")}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </div>
          )}
        </center>
      </div>
    </MainContainer>
  );
};

export default OrderDetails;
