import "./dashboard.css";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import Widget from "../../../component/admin/widget/Widget";
import Featured from "../../../component/admin/featured/Featured";
import Chart from "../../../component/admin/chart/Chart";
import LatestPayments from "../../../component/admin/LatestPayments/LatestPayments";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="customer" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Renvenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <LatestPayments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
