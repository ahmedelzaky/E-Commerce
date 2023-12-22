import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../hooks/useAxios";
import PropTypes from "prop-types";

const Chart = ({ aspect, title }) => {
  const { data } = useAxios("/payment/last-7days-earnings");

  return (
    <div
      className="chart"
      style={{
        height: "512px",
      }}
    >
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        {data && (
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

Chart.propTypes = {
  aspect: PropTypes.number,
  title: PropTypes.string,
};

export default Chart;
