import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import GradingIcon from "@mui/icons-material/Grading";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";

const Sidebar = () => {
  const [notificationCount, setNotificationCount] = useState(
    localStorage.getItem("notificationCount") || 0
  );

  const [delevary, setDelevary] = useState(
    localStorage.getItem("delevary") || 0
  );

  const { data: lowStock } = useAxios("/products/Low-stock-count");
  const { data: pending } = useAxios("/orders/orders-count/PENDING");
  const { data: inprogress } = useAxios("/orders/orders-count/IN_PROGRESS");

  useEffect(() => {
    if (inprogress !== null) {
      setDelevary(parseInt(inprogress));
      localStorage.setItem("delevary", parseInt(inprogress));
    }
  }, [inprogress]);

  useEffect(() => {
    if (lowStock !== null && pending !== null) {
      setNotificationCount(parseInt(lowStock) + parseInt(pending));
      localStorage.setItem(
        "notificationCount",
        parseInt(lowStock) + parseInt(pending)
      );
    }
  }, [lowStock, pending]);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>

          <Link to="/admin/customers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Customers</span>
            </li>
          </Link>

          <Link to="/admin/Products" style={{ textDecoration: "none" }}>
            <li>
              <ProductionQuantityLimitsIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>

          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryOutlinedIcon className="icon" />
              <span>categories</span>
            </li>
          </Link>

          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              <GradingIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/admin/delivery" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              {delevary > 0 && <Badge badgeContent={delevary}></Badge>}
              <span>Delivery</span>
            </li>
          </Link>
          <Link to="/admin/notifications" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneOutlinedIcon className="icon" />
              {notificationCount > 0 && (
                <Badge badgeContent={notificationCount}></Badge>
              )}
              <span>Notifications</span>
            </li>
          </Link>
          <Link to="/admin/sails" style={{ textDecoration: "none" }}>
            <li>
              <StoreMallDirectoryOutlinedIcon className="icon" />
              <span>Sails</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <StoreMallDirectoryOutlinedIcon className="icon" />
              <span>Store</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
