import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { productColumns, productsActionColums } from "../../../datatablesource";

const Productslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable
          url={`/products`}
          columns={productColumns}
          title={"Products"}
          actionColum={productsActionColums}
          addNew={true}
        />
      </div>
    </div>
  );
};

export default Productslist;
