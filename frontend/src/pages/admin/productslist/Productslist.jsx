import Datatable from "../../../component/admin/datatable/Datatable";
import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import { productColumns, productsActionColums } from "../../../datatablesource";
import "./productslist.css";

const Productslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable
          url={`/products`}
          columns={productColumns}
          title={"products"}
          actionColum={productsActionColums}
        />
      </div>
    </div>
  );
};

export default Productslist;
