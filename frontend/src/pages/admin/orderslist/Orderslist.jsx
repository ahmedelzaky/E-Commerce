import Navbar from "../../../component/admin/navbar/Navbar";
import Orders from "../../../component/admin/orders/Orders";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import "./orderslist.css";

const Orderslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Orders />
      </div>
    </div>
  );
};

export default Orderslist;
