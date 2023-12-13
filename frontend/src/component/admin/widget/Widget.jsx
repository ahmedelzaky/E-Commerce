import "./widget.css";
import "../../../style/dark.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const { data: amount } = useAxios(
    type === "earning"
      ? "/payment/earnings"
      : type == "order"
      ? "/orders/orders-count/COMPLETED"
      : "/customers/count"
  );

  let data;
  switch (type) {
    case "customer":
      data = {
        title: "Customers",
        link: "View all Customers",
        isMoney: false,
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              background: "rgba(255,0,0,0.2)",
            }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "Completed ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              background: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;

    case "earning":
      data = {
        title: "ERARNINGS",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              background: "rgba(0,128,0,0.2)",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {!amount ? "loading..." : amount}
        </span>
        <Link
          style={{ textDecoration: "none" }}
          to={`${type}s`}
          className="link"
        >
          {data.link}
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

Widget.propTypes = {
  type: PropTypes.string,
};

export default Widget;
