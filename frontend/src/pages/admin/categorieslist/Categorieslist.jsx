import Datatable from "../../../component/admin/datatable/Datatable";
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
        <Datatable
          url={`/categories`}
          columns={categoryColumns}
          title={"Categories"}
          actionColum={categoriesActionColum}
          addNew={true}
        />
      </div>
    </div>
  );
};

export default Categorieslist;
