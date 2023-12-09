import Datatable from "../../../component/admin/datatable/Datatable";
import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import "./list.css";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
