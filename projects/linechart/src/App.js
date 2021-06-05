import React from "react";
import LineChart from "./components/lineChart";
import SelectionType from "./components/selectionType";
import SelectionYear from "./components/selectionYear";
import { LabelX, LabelY } from "./components/label";
import AppContextProvider from "./context/appContext";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SelectionStation from "./components/selectionStation";
import Selection from "./components/selection";

function App() {
  return (
    <div className="m-2 chartWrapper">
      <AppContextProvider>
        <div className="container">
          <div className="row justify-content-center">
            <Selection />
            {/* <Selection stations />
            <Selection year />
            <Selection optionData/> */}
            {/* <SelectionType />
            <SelectionYear />
            <SelectionStation /> */}
          </div>
          <LabelY />
          <LineChart
            width={700}
            height={750}
            horizontalGuides={5}
            precision={2}
          />
          <LabelX />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;

