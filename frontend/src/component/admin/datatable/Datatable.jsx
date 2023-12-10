import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../ErrorMessage";
import LoadingScreen from "../../LoadingScreen";
import PropTypes from "prop-types";

const Datatable = ({ columns, url, title, actionColum }) => {
  const { data, isPending, error } = useAxios(url);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link to="new" className="link" style={{ textDecoration: "none" }}>
          Add New
        </Link>
      </div>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      {isPending && <LoadingScreen />}
      {data && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColum)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  );
};

Datatable.propTypes = {
  columns: PropTypes.array,
  actionColum: PropTypes.array,
  url: PropTypes.string,
  title: PropTypes.string,
};

export default Datatable;
