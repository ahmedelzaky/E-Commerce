import { useParams } from "react-router-dom";
import MainContainer from "../../../component/admin/new/MainContainer";
import useAxios from "../../../hooks/useAxios";
import LoadingScreen from "../../../component/LoadingScreen";
import ErrorMessage from "../../../component/ErrorMessage";
import "./orderdetails.css";
import { Button } from "@mui/material";
import { updateOrderStatus } from "../../../api/Server";
import CartTable from "../../../component/CartTable";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    data: order,
    isPending,
    error,
  } = useAxios(`/orders/get-order-details-by-id/${orderId}`);

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
              </li>
              <ul>
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
              </ul>
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
            <CartTable orderId={Number(orderId)}></CartTable>
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
