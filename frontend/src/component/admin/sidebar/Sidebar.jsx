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

const Sidebar = () => {
  const [lowStockProducts, setLowStockProducts] = useState(
    localStorage.getItem("lowStockProductsCount") || 0
  );
  const { data } = useAxios("/products/low-stock");
  useEffect(() => {
    if (data?.length > 0) {
      setLowStockProducts(data.length);
      localStorage.setItem("lowStockProductsCount", data.length);
    }
  }, [data]);
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

          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
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
              <span>Delivery</span>
            </li>
          </Link>
          <Link to="/admin/notigications" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneOutlinedIcon className="icon" />
              {lowStockProducts > 0 && (
                <Badge badgeContent={lowStockProducts}></Badge>
              )}
              <span>Notifications</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
