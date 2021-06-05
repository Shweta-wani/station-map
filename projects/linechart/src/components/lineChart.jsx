import React, { useRef, useState } from "react";
import { useApp } from "../context/appContext";
import "font-awesome/css/font-awesome.css";

//Line chart is creating with SVG 
// working mainly with padding, height(complete height), width
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
  const svgRef = useRef();
  const [isDisable, setIsDisable] = useState(true);

  if (-minimumYFromData > maximumYFromData) {
    maximumYFromData = -minimumYFromData;
  }

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  //Points x and y for the linechart
  //calculating x point with dividing maximum value in x and adding padding and fontsize
  //same with y points, just the difference to minus chart height for reversing it.
  const dataPoints = data
    .map(element => {
      const x = (element.x * 2 / maximumXFromData) * chartWidth + padding + FONT_SIZE;
      const y =
        (chartHeight - (element.y / (maximumYFromData)) * chartHeight) / 2 + padding;
      return ({ x, y })
    });

  // points for polyline
  const points = dataPoints
    .map(el => {
      console.log()
      return (`${el.x},${el.y}`)
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

  //horizontal guides is dividing in negative and positive guides
  //working with number of horizontal lines
  //adding 1 to positive guides for number 0

  const HorizontalGuides = (newChartHeight) => {
    const startX = padding + FONT_SIZE;
    const endX = width * 2;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      let ratio = 0;
      ratio = ((index + 1) / 2) / numberOfHorizontalGuides;
      const yCoordinate = (newChartHeight.chartHeight - chartHeight * ratio + padding);

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

  const HorizontalGuidesPositive = () => (
    <HorizontalGuides chartHeight={chartHeight / 2}></HorizontalGuides>
  );

  const HorizontalGuidesNigative = () => (
    <HorizontalGuides chartHeight={chartHeight}></HorizontalGuides>
  );

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

  const LabelsYAxis = (parts) => {
    let PARTS = numberOfHorizontalGuides;
    let newIndex = numberOfHorizontalGuides;

    if (-minimumYFromData > maximumYFromData) {
      maximumYFromData = -minimumYFromData;
    }

    return new Array((PARTS + parts.increaseParts)).fill(0).map((_, index) => {
      const x = FONT_SIZE;
      const ratio = (index / 2) / numberOfHorizontalGuides;
      const addIndex = parts.activeIndex ? newIndex-- : index;

      const yCoordinate =
        parts.newChartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
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
          {parts.activeIndex ? -(parseFloat(maximumYFromData * (((addIndex)) / PARTS)).toFixed(precision)) :
            (parseFloat(maximumYFromData * (((addIndex)) / PARTS)).toFixed(precision))
          }
        </text>
      );
    });
  };

  const LabelsYAxisNegative = () => (
    <LabelsYAxis increaseParts={0} newChartHeight={chartHeight} activeIndex={true}></LabelsYAxis>
  );

  const LabelsYAxisPositive = () => (
    <LabelsYAxis increaseParts={1} newChartHeight={chartHeight / 2} activeIndex={false}></LabelsYAxis>
  );

  function handleZoomIn(e) {
    setIsDisable(false);
    svgRef.current.currentScale += .1 
    //return (svgRef.current.width.baseVal.value += 50);
  }
  function handleZoomOut(e) {
    if (svgRef.current.currentScale > 1)
    svgRef.current.currentScale -= .1 
     // return (svgRef.current.width.baseVal.value -= 50);
    else {
      setIsDisable(true);
    }
  }

  // circle uses the same points as polyline points
  const Circle = () => {
    const circle = dataPoints
      .map(element => {
        return (
          <circle
            key={element.x}
            cx={element.x ? element.x : null}
            cy={element.y ? element.y : null}
            r="4"
            fill="red"
            opacity='1' />
        )
      });
    return circle ? circle : "";
  };

  return (
    <div class="wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width * 2} ${height}`}
        overflow="auto !important"
        ref={svgRef}
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
      <button className="btn btnSize zoomIn" onClick={(e) => handleZoomIn(e)}>
          <i className={"fa fa-plus"} />
        </button>
        <button className="btn btnSize zoomOut" onClick={(e) => handleZoomOut(e)} disabled={isDisable}>
          <i className={"fa fa-minus"} />
        </button>
    </div>
  );
};

export default LineChart;