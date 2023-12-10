import Datatable from "../../../component/admin/datatable/Datatable";
import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { orderColumns, ordersActionColum } from "../../../datatablesource";
import "./orderslist.css";

const Orderslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable
          url={`/orders`}
          columns={orderColumns}
          title={"orders"}
          actionColum={ordersActionColum}
        />
      </div>
    </div>
  );
};

export default Orderslist;
