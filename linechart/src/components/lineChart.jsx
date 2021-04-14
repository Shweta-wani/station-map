import React from "react";
import { useApp } from "../context/appContext";
const LineChart = ({
  height,
  width,
  horizontalGuides: numberOfHorizontalGuides,
  precision
}) => {
  const { data } = useApp();
  const FONT_SIZE = width / 25;
  const maximumXFromData = Math.max(...data.map(e => e.x));
  let maximumYFromData = Math.max(...data.map(e => e.y));
  const minimumYFromData = Math.min(...data.map(e => e.y));

  if (-minimumYFromData > maximumYFromData) {
    maximumYFromData = -minimumYFromData;
  }

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data
    .map(element => {
      const x = (element.x * 2 / maximumXFromData) * chartWidth + padding + FONT_SIZE;
      const y =
        (chartHeight - (element.y / (maximumYFromData)) * chartHeight) / 2 + padding;
      return `${x},${y}`;
    })
    .join(" ");

  const Axis = ({ points }) => (
    <polyline fill="none" stroke="green" strokeWidth="5" points={points} />
  );

  const XAxis = () => (
    <Axis
      points={`${padding + FONT_SIZE},${height - padding} ${width * 2},${height -
        padding}`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding + FONT_SIZE},0 ${padding + FONT_SIZE},${height - padding}`} />
  );

  const HorizontalGuidesPositive = () => {
    const startX = padding + FONT_SIZE;
    const endX = width * 2;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      let ratio = 0;
      ratio = ((index + 1) / 2) / numberOfHorizontalGuides;
      const yCoordinate = (chartHeight / 2 - chartHeight * ratio + padding);

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={"#ccc"}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };
  const HorizontalGuidesNigative = () => {
    const startX = padding + FONT_SIZE;
    const endX = width * 2;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      let ratio = 0;
      ratio = ((index + 1) / 2) / numberOfHorizontalGuides;

      const yCoordinate = (chartHeight - chartHeight * ratio + padding);

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={"#ccc"}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;

    return data.map((element, index) => {
      const x =
        (element.x * 2 / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: "#fff",
            fontSize: FONT_SIZE,
            fontFamily: "Helvetica",
          }}
        >
          {element.label}
        </text>
      );
    });
  };

  const LabelsYAxisPositive = () => {
    let PARTS = numberOfHorizontalGuides;

    if (-minimumYFromData > maximumYFromData) {
      maximumYFromData = -minimumYFromData;
    }

    return new Array((PARTS + 1)).fill(0).map((_, index) => {
      const x = FONT_SIZE;
      const ratio = (index / 2) / numberOfHorizontalGuides;

      const yCoordinate =
        chartHeight / 2 - chartHeight * ratio + padding + FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={{
            fill: "#fff",
            fontSize: FONT_SIZE,
            fontFamily: "Helvetica"
          }}
        >
          {parseFloat(maximumYFromData * (((index)) / PARTS)).toFixed(precision)}

        </text>
      );
    });
  };

  const LabelsYAxisNegative = () => {
    let PARTS = numberOfHorizontalGuides;
    let newIndex = numberOfHorizontalGuides;

    if (-minimumYFromData > maximumYFromData) {
      maximumYFromData = -minimumYFromData;
    }

    return new Array((PARTS)).fill(0).map((_, index) => {

      const x = FONT_SIZE;
      const ratio = (index / 2) / numberOfHorizontalGuides;

      const yCoordinate =
        chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={{
            fill: "#fff",
            fontSize: FONT_SIZE,
            fontFamily: "Helvetica"
          }}
        >
          {parseFloat(-(maximumYFromData * (((newIndex--)) / PARTS)).toFixed(precision))}

        </text>
      );
    });
  };

  const Circle = () => {
    const circle = data
      .map(element => {
        const x = (element.x * 2 / maximumXFromData) * chartWidth + padding + FONT_SIZE;
        const y =
          (chartHeight - (element.y / (maximumYFromData)) * chartHeight) / 2 + padding;
        return (
          <circle
            key={element.x}
            cx={x ? x : null}
            cy={y ? y : null}
            r="4"
            fill="red"
            opacity='1' />
        )
      });
    return circle ? circle : "";
  };

  return (
    <div style={{ position: 'relative', overflow: 'scroll' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width * 2} ${height}`}
        overflow="auto !important"
      >
        <XAxis />
        <LabelsXAxis />
        <YAxis />
        <LabelsYAxisPositive />
        <LabelsYAxisNegative />
        <Circle />
        <HorizontalGuidesPositive />
        <HorizontalGuidesNigative />
        <line x1={`${padding + FONT_SIZE}`} y1="0" x2={`${padding + FONT_SIZE - 20}`} y2={`${padding + FONT_SIZE - 105}`} style={{ stroke: "green", strokeWidth: 5 }} />
        <line x1={`${padding + FONT_SIZE}`} y1="0" x2={`${padding + FONT_SIZE + 20}`} y2={`${padding + FONT_SIZE - 105}`} style={{ stroke: "green", strokeWidth: 5 }} />

        <line x1={`${width * 2}`} y1={`${height - padding}`} x2={`${(width * 3) - (height - padding) - 80}`} y2={`${height - padding - 20}`} style={{ stroke: "green", strokeWidth: 5 }} />
        <line x1={`${width * 2}`} y1={`${height - padding}`} x2={`${(width * 3) - (height - padding) - 80}`} y2={`${height - padding + 20}`} style={{ stroke: "green", strokeWidth: 5 }} />

        <polyline
          fill="none"
          stroke="yellow"
          strokeWidth='3'
          points={points}
        />
      </svg>
    </div>

  );
};

export default LineChart;