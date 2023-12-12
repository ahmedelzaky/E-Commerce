import Sidebar from "../../../component/admin/sidebar/Sidebar";
import Datatable from "../../../component/admin/datatable/Datatable";
import {
  deliveryColumns,
  inProgressOrderActionColum,
} from "../../../datatablesource";

const Delivery = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable
          url={`/orders/get-orders-by-status/IN_PROGRESS`}
          columns={deliveryColumns}
          title={"In Progress Orders"}
          actionColum={inProgressOrderActionColum}
        />
      </div>
    </div>
  );
};

export default Delivery;
