import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}
const year = [
    { value: 1931, text: '1031 - 1940' },
    { value: 1941, text: '1041 - 1950' },
    { value: 1951, text: '1051 - 1960' },
    { value: 1961, text: '1061 - 1970' },
    { value: 1971, text: '1071 - 1980' },
    { value: 1981, text: '1081 - 1990' }
];
const optionsData = [
    { value: "JA_TT", text: "Lufttemperatur" },
    { value: "JA_TN", text: "Lufttemperatur Minimums" },
    { value: "JA_RR", text: "Niederschlagshoehe" },
    { value: "JA_N", text: "Bedeckungsgrades" },
];

function AppContextProvider({ children }) {

    let [data, setData] = useState([]);
    let [textY, setTextY] = useState(optionsData[0].text);
    let [type, setType] = useState(optionsData[0].value);
    let [yearvalue, setYearValue] = useState(year[0].value);
    let [textX, setTextX] = useState(year[0].text);
    let [stationsId, setStationsId] = useState(1);
    let [stationsName, setStationsName] = useState('');
    let [stations, setStations] = useState([]);

    function getFile() {
        const url = "http://localhost:3000/txtfile";
        let array = [];
        axios
            .post(
                url,
                {stationsId},
                { credentials: 'include' },
                { withCredentials: true }
            )
            .then(result => {
                result.data.map((value, index) => {
                    const newYear = Number(value.MESS_DATUM_BEGINN.toString().substring(0, 4));
                    if (newYear >= yearvalue && array.length < 10) {
                        return (
                            array.push(
                                { label: newYear, x: array.length, y: value[type] }
                            ))
                    }
                });
                setData(array);
            })
            .catch(error => {
                console.log("Fetching data error", error);
                // this.setState({ showerror: true })
            });
        return array;
    }


    function getStation() {
        const url = "http://localhost:3000/stationDetail";
            let array = [];
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    result.map((value, index) => {
                        if (array.length < 10) {
                            return (
                                array.push(
                                    { stationsId: value.Stations_id, stationsName: value.Stationsname }
                                ))
                        }
                    });
                    setStations(array);
                }).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
    
            return array;
    }

    function selectYear(changedYear, yearText) {
        setYearValue(changedYear);
        setTextX(yearText);
    }
    function selectType(chagedType, chagedTextY) {
        setType(chagedType);
        setTextY(chagedTextY);
    }

    function selectStaion(changedStationId, changedStationName) {
        setStationsId(changedStationId);
        setStationsName(changedStationName);
    }

    useEffect(() => {
        getFile();
    }, [type, yearvalue, stationsId]);
    
    useEffect(() => {
        getStation();
    }, []);

    const value = {
        data,
        getFile,
        textY,
        textX,
        optionsData,
        year,
        selectYear,
        selectType,
        stations,
        stationsId,
        stationsName,
        selectStaion
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
