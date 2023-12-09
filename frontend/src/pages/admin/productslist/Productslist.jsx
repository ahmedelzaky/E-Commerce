import Navbar from "../../../component/admin/navbar/Navbar";
import Products from "../../../component/admin/products/Products";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import "./productslist.css";

const Productslist = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerr">
        <Navbar />
        <Products />
      </div>
    </div>
  );
};

export default Productslist;
