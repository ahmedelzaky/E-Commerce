import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import {
  ProductsSoldColumns,
  productsSailsActionColums,
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
          actionColum={productsSailsActionColums}
        />
      </div>
    </div>
  );
};

export default Productslist;
