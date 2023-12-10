import Datatable from "../../../component/admin/datatable/Datatable";
import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import {
  categoriesActionColum,
  categoryColumns,
} from "../../../datatablesource";

const Categorieslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable
          url={`/categories`}
          columns={categoryColumns}
          title={"categories"}
          actionColum={categoriesActionColum}
        />
      </div>
    </div>
  );
};

export default Categorieslist;
