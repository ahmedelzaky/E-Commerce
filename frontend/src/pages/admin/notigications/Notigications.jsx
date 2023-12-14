import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { deliveryColumns, pendingOrderActionColum, productColumns, productsActionColums } from "../../../datatablesource";

const Notigications = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable
          url={`/products/low-stock`}
          columns={productColumns}
          title={"Low Stock Products"}
          actionColum={productsActionColums}
        />
        <Datatable
          url={`/orders/get-orders-by-status/PENDING`}
          columns={deliveryColumns}
          title={"Pending Orders"}
          actionColum={pendingOrderActionColum}
        />
      </div>
    </div>
  );
};

export default Notigications;
