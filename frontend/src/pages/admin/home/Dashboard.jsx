import "./dashboard.css";
import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import Widget from "../../../component/admin/widget/Widget";
import Featured from "../../../component/admin/featured/Featured";
import Chart from "../../../component/admin/chart/Chart";
import Table from "../../../component/admin/table/Table";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Renvenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
