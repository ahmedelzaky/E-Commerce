import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { orderColumns, ordersActionColum } from "../../../datatablesource";

const Orderslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable
          url={`/orders/get-orders-by-status/COMPLETED`}
          columns={orderColumns}
          title={"Orders"}
          actionColum={ordersActionColum}
        />
      </div>
    </div>
  );
};

export default Orderslist;
