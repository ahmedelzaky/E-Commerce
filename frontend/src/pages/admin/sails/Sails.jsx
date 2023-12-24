import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import {
  ProductsSoldColumns,
  productsActionColums,
} from "../../../datatablesource";

const Productslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable
          url={`/products/sails`}
          columns={ProductsSoldColumns}
          title={"Sold Produycts"}
          actionColum={productsActionColums}
        />
      </div>
    </div>
  );
};

export default Productslist;
