import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useGetActiveSprintBurndownChart } from "generated/hook";

// import { burndownChartData } from "./BurndownChart.service";

const BurndownChart = () => {
  const { data } = useGetActiveSprintBurndownChart();
  
  return (
    <LineChart width={320} height={200} data={data}>
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="pointsShippedCount"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="pointsIfNoValidationReturnCount"
        stroke="#FFA000"
      />
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="target"
        stroke="#FF0000"
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis dataKey="target" />
      <RechartsTooltip />
    </LineChart>
  );
};

export default BurndownChart;
