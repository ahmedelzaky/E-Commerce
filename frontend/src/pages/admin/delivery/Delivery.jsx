import Sidebar from "../../../component/admin/sidebar/Sidebar";
import Navbar from "../../../component/admin/navbar/Navbar";
import Datatable from "../../../component/admin/datatable/Datatable";
import { orderColumns, ordersActionColum } from "../../../datatablesource";

const Delivery = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable
          url={`/orders/in-progress-orders`}
          columns={orderColumns}
          title={"In Progress Orders"}
          actionColum={ordersActionColum}
        />
        <Datatable
          url={`/orders/pending-orders`}
          columns={orderColumns}
          title={"Pending Orders"}
          actionColum={ordersActionColum}
        />
      </div>
    </div>
  );
};

export default Delivery;
