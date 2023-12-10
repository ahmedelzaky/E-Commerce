import Sidebar from "../../../component/admin/sidebar/Sidebar";
import Navbar from "../../../component/admin/navbar/Navbar";
import Datatable from "../../../component/admin/datatable/Datatable";
import {
  deliveryColumns,
  inProgressOrderActionColum,
  pendingOrderActionColum,
} from "../../../datatablesource";

const Delivery = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable
          url={`/orders/in-progress-orders`}
          columns={deliveryColumns}
          title={"In Progress Orders"}
          actionColum={inProgressOrderActionColum}
        />
        <Datatable
          url={`/orders/pending-orders`}
          columns={deliveryColumns}
          title={"Pending Orders"}
          actionColum={pendingOrderActionColum}
        />
      </div>
    </div>
  );
};

export default Delivery;
