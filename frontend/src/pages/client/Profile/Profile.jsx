import { Container, Row } from "react-bootstrap";
import { USER } from "../../../api/auth";
import NavBar from "../../../component/client/NavBar/NavBar";
import useAxios from "../../../hooks/useAxios";
import "./profile.css";
import LoadingScreen from "../../../component/LoadingScreen";
import ErrorMessage from "../../../component/ErrorMessage";
import CartTable from "../../../component/CartTable";

const Profile = () => {
  const { data: customer, error, loading } = useAxios(`/customers/${USER.id}`);
  const { data: orders } = useAxios(
    `/orders/get-order-details-by-customer-id/${USER.id}`
  );
  console.log(orders);
  return (
    <NavBar>
      <div className="profile">
        <Container>
          {loading && <LoadingScreen></LoadingScreen>}
          {error && <ErrorMessage></ErrorMessage>}
          {customer && (
            <Row className="details">
              <div className="customer">
                <h4>Profile</h4>
                <h6>
                  <span>First Name: {customer.firstName}</span>
                  <span> Last Name: {customer.lastName}</span>
                </h6>
                <h6>
                  <span> Email: {customer.email}</span>
                  <span>Phone: {customer.phone}</span>
                </h6>

                <h6>Join Date: {new Date(customer.joinDate).toUTCString()} </h6>
              </div>
              <div className="orders">
                {orders?.map((order) => (
                  <Row key={order.id}>
                    <div className="oredr-headding">
                      <h6>
                        {" "}
                        <span>Order #{order.id}</span>
                        <span>
                          Order Date {new Date(order.orderDate).toUTCString()}{" "}
                        </span>
                        {order.arrivalDate && (
                          <span>
                            {" "}
                            Arriva Date{" "}
                            {new Date(order.arrivalDate).toUTCString()}{" "}
                          </span>
                        )}
                        <span
                          className={`status ${
                            order.statue == "COMPLETED" ? "Approved" : "Pending"
                          }`}
                        >
                          {order.statue}{" "}
                        </span>
                      </h6>
                    </div>
                    <CartTable orderId={order.id} />
                    <hr />
                  </Row>
                ))}
              </div>
            </Row>
          )}
        </Container>
      </div>
    </NavBar>
  );
};

export default Profile;
