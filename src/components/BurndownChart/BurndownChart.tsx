import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { burndownChartData } from "./BurndownChart.service";

const BurndownChart = () => {
  return (
    <LineChart width={320} height={200} data={burndownChartData}>
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="pointsLeftToDo"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="pointsLeftToDoIfEverythingIsValidated"
        stroke="#FFA000"
      />
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="expectedPointsDone"
        stroke="#FF0000"
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis dataKey="expectedPointsDone" />
      <RechartsTooltip />
    </LineChart>
  );
};

export default BurndownChart;
