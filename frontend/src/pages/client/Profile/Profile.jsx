import React from 'react';
import { Button, Container, Row } from "react-bootstrap";
import { USER } from "../../../api/auth";
import NavBar from "../../../component/client/NavBar/NavBar";
import useAxios from "../../../hooks/useAxios";
import "./profile.css";
import LoadingScreen from "../../../component/LoadingScreen";
import ErrorMessage from "../../../component/ErrorMessage";
import CartTable from "../../../component/CartTable";
import { updateOrderStatus } from "../../../api/Server";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const { data: customer, error, loading } = useAxios(`/customers/${USER.id}`);
  const { data: orders } = useAxios(
    `/orders/get-order-details-by-customer-id/${USER.id}`
  );
  return (
    <NavBar>
      <div className="profile">
        <Container>
          {loading && <LoadingScreen></LoadingScreen>}
          {error && <ErrorMessage></ErrorMessage>}
          {customer && (
            <Row className="details">
              <div className="customer">
                <h4>
                  <FontAwesomeIcon icon={faUser} /> Profile
                </h4>
                <h6>
                  <span className="label">First Name:</span>
                  <span className="value">{customer.firstName}</span>
                </h6>

                <h6>
                <span className="label">Last Name:</span>
                <span className="value">{customer.lastName}</span>
                </h6>

                <h6>
                  <span className="label"> Email:</span>
                  <span className="value"> {customer.email}</span>
                </h6>

                <h6>
                  <span className="label">Phone:</span>
                  <span className="value"> {customer.phone}</span>
                </h6>

                <h6>
                  <span  className="label">Join Date: </span>
                  <span className="value"> {new Date(customer.joinDate).toUTCString()}</span>
                </h6>
              </div>
              {orders?.length > 0 && (
                <div className="orders">
                  {orders?.map((order) => (
                    <Row key={order.id}>
                      <div className="order-headding">
                      <h6>
                        <span className="label">Order: </span>
                        <span className="value">#{order.id}</span>
                      </h6>
                      <h6>
                        <span className="label">Order Date: </span>
                        <span className="value">{new Date(order.orderDate).toUTCString()}{" "}</span>
                        </h6>
                        <h6>
                    {order.arrivalDate && (
                      <span>
                        <span className="label"> Arrival Date: </span>
                        <span className="value">{new Date(order.arrivalDate).toUTCString()}</span>
                      </span>
                    )}
                        </h6>
                        <h5>
                          <span
                          className={`status ${
                            order.statue === "COMPLETED" ? "Approved" :
                            order.statue === "PENDING" ? "Pending" : "Cancelled"
                          }`}
                        >
                          {order.statue}{" "}
                        </span>
                        {order.statue === "PENDING" && (
                          <Button
                            onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                            variant="danger"
                          >
                            Cancel
                          </Button>
                        )}
                        </h5>
                      </div>
                      <CartTable orderId={order.id} />
                      <hr />
                    </Row>
                  ))}
                </div>
              )}
            </Row>
          )}
        </Container>
      </div>
    </NavBar>
  );
};

export default Profile;
