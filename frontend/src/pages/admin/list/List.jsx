import Datatable from "../../../component/admin/datatable/Datatable";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import "./list.css";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable />
      </div>
    </div>
  );
};

export default List;
