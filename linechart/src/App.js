import React from "react";
import LineChart from "./components/lineChart";
import SelectionType from "./components/selectionType";
import SelectionYear from "./components/selectionYear";
import {LabelX, LabelY} from "./components/label";
import AppContextProvider from "./context/appContext";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SelectionStation from "./components/selectionStation";

const styles = {
  chartComponentsContainer: {
    display: 'grid', gridTemplateColumns: 'max-content 700px', alignItems: 'center'
  },
  chartWrapper: { height: '80vh', maxWidth: '80vw', alignItems: 'center', justifyContent: 'center' }
}

function App() {
  return (
    <div style={styles.chartWrapper} className="m-2">
      <AppContextProvider>
        <div className="container">
          <div className="row justify-content-center">
            <SelectionType />
            <SelectionYear />
            <SelectionStation />
           </div>
          <LabelY />
            <LineChart
              width={700}
              height={750}
              horizontalGuides={10}
              precision={2}
          />
           <LabelX/>
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;

