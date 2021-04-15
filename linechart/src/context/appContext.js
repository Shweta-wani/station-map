import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

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
    let [yearvalue, setYearValue] = useState('');
    let [textX, setTextX] = useState('');
    let [stationsId, setStationsId] = useState(1);
    let [stationsName, setStationsName] = useState('');
    let [stations, setStations] = useState([]);
    let [year, setYear] = useState([]);

    // this function is work for sending station_id to the api 
    //and getting the response with json data according to the selected station
    // also changes the year options according to the data in json file
    function getFile() {
        const url = "http://localhost:3000/txtfile";
        let array = [];
        let years = []
        axios
            .post(
                url,
                { stationsId },
                { credentials: 'include' },
                { withCredentials: true }
            )
            .then(result => {
                const startYear = splitYear(result.data[0]);
                const EndYear = splitYear(result.data[result.data.length - 1]);
                for (let i = startYear; i < EndYear; i += 9){
                    years.push({
                        value: i, text: `${i} - ${i+9}`
                    })
                }
                result.data.map((value, index) => {
                    const newYear = splitYear(value);
                    if (newYear >= yearvalue && array.length < 10) {
                        return (
                            array.push(
                                { label: newYear, x: array.length, y: value[type] }
                            ))
                    }
                });
                setData(array);
                setYear(years);
            })
            .catch(error => {
                console.log("Fetching data error", error);
            });
        return array;
    }

    function splitYear(yearString) {
        return Number(yearString.MESS_DATUM_BEGINN.toString().substring(0, 4));
    }

    // fetching the station data
    function getStation() {
        const url = "http://localhost:3000/stationDetail";
        const urlFiles = "http://localhost:3000/stationDetail/files";
        let array = [];
        let fileArray = [];

        fetch(urlFiles)
            .then(response => response.json())
            .then(result => {
                fileArray.push(...result);
            })
            .catch(() => console.log("Can’t access " + urlFiles + " response. Blocked by browser?"));

        fetch(url)
            .then(response => response.json())
            .then(result => {
                result.map((value, index) => {
                    if (fileArray.includes(value.Stations_id)) {
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
