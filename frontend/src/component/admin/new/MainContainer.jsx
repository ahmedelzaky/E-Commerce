import Sidebar from "../sidebar/Sidebar";
import "./mainContainer.css";
import { PropTypes } from "prop-types";

const MainContainer = ({ children, title }) => {
  return (
    <div className="main">
      <Sidebar />
      <div className="mainContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">{children}</div>
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
};

export default MainContainer;
