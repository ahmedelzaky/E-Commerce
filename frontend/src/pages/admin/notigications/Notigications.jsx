import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { productColumns, productsActionColums } from "../../../datatablesource";

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
          addNew={true}
        />
      </div>
    </div>
  );
};

export default Notigications;
