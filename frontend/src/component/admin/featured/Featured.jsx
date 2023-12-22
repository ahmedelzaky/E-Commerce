import "./featured.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import "../../../style/dark.css";
import useAxios from "../../../hooks/useAxios";

const Featured = () => {
  const { data: earnings } = useAxios("/payment/earnings-today");
  const { data: holdEarnings } = useAxios("/payment/hold-earnings");

  const target = 10000;
  return (
    <div className="featured">
      <div className="top">
        <div className="title">Total Revenue</div>
      </div>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={Math.round((earnings / target) * 100)}
            text={`${Math.round((earnings / target) * 100)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total earnings made today</p>
        <p className="amount">${Number(earnings).toFixed(2)}</p>
        <p className="title">In Hold</p>
        <p className="amount">${Number(holdEarnings).toFixed(2)}</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <center>
              <div
                className={`itemResult ${
                  target > earnings ? "negative" : "positive"
                }`}
              >
                {target > earnings ? (
                  <KeyboardArrowDownIcon fontSize="small" />
                ) : (
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                )}
                <div className="resultAmount">${target}</div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
