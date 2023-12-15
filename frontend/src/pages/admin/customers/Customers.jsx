import Sidebar from "../../../component/admin/sidebar/Sidebar";
import Datatable from "../../../component/admin/datatable/Datatable";
import { customerColumns } from "../../../datatablesource";

const Customers = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Datatable
          url={`/customers`}
          columns={customerColumns}
          title={"Customers"}
        />
      </div>
    </div>
  );
};

export default Customers;
