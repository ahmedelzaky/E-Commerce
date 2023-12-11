import Datatable from "../../../component/admin/datatable/Datatable";
import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { orderColumns, ordersActionColum } from "../../../datatablesource";

const Orderslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable
          url={`/orders/delivered-orders`}
          columns={orderColumns}
          title={"Orders"}
          actionColum={ordersActionColum}
        />
      </div>
    </div>
  );
};

export default Orderslist;
