import TextFieldsIcon from "@mui/icons-material/TextFields";
import TimelineIcon from "@mui/icons-material/Timeline";
import { IconButton } from "@mui/material";
import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useGetActiveSprintBurndownChart } from "generated/hook";
import useCopyToClipboard from "hooks/useCopyToClipboard";

// import { burndownChartData } from "./BurndownChart.service";

function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

const BurndownChart = () => {
  const { data } = useGetActiveSprintBurndownChart();
  const [, copy] = useCopyToClipboard();
  const chartRef = useRef<HTMLDivElement>(null);

  const onClickCopyChart = () => {
    if (!chartRef?.current) {
      return;
    }

    html2canvas(chartRef.current).then((canvas) => {
      const tempElem = document.createElement("div");

      tempElem.appendChild(canvas);

      const blob = dataURItoBlob(canvas.toDataURL());
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(function () {
          console.log("Image copied to clipboard.");
        })
        .catch(function (error) {
          console.error("Unable to copy image to clipboard: ", error);
        })
        .finally(function () {
          document.body.removeChild(tempElem);
        });
    });
  };

  const onClickGenerateTextReport = () => {
    if (!data) {
      return;
    }
    let latestUpdatedDayIdx = 0;

    data.forEach((day, index) => {
      if (!day.pointsIfNoValidationReturnCount || !day.pointsShippedCount) {
        return;
      }

      latestUpdatedDayIdx = index;
    });

    const pointsLateCount =
      (data[latestUpdatedDayIdx].pointsShippedCount || 0) -
      data[latestUpdatedDayIdx].target;
    const pointsToValidateCount =
      (data[latestUpdatedDayIdx].pointsShippedCount || 0) -
      (data[latestUpdatedDayIdx].pointsIfNoValidationReturnCount || 0);
    const textReport = `The team is late by ${pointsLateCount} points with ${pointsToValidateCount} points to validate`;
    copy(textReport);
  };

  return (
    <div style={{ position: "relative" }}>
      <div ref={chartRef} style={{ marginLeft: "-30px" }}>
        <LineChart width={320} height={400} data={data}>
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="pointsShippedCount"
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            strokeWidth={1}
            dataKey="target"
            stroke="#FF0000"
          />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="pointsIfNoValidationReturnCount"
            stroke="#FFA000"
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis dataKey="target" />
          <RechartsTooltip />
        </LineChart>
      </div>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <IconButton onClick={onClickCopyChart}>
          <TimelineIcon />
        </IconButton>
        <IconButton onClick={onClickGenerateTextReport}>
          <TextFieldsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default BurndownChart;
