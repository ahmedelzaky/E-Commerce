import Navbar from "../../../component/admin/navbar/Navbar";
import Sidebar from "../../../component/admin/sidebar/Sidebar";
import "./new.css";
import { PropTypes } from "prop-types";

const New = ({ children, title }) => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">{children}</div>
      </div>
    </div>
  );
};

New.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
};

export default New;
