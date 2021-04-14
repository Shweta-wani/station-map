import React, { createContext, useContext, useState, useEffect } from "react";

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

    function jsonFile() {
        const url = "http://localhost:3000/txtfile";
        let array = [];
        fetch(url)
            .then(response => response.json())
            .then(result => {
                result.map((value, index) => {
                    const newYear = Number(value.MESS_DATUM_BEGINN.toString().substring(0, 4));
                    if (newYear >= yearvalue && array.length < 10) {
                        return (
                            array.push(
                                { label: newYear, x: array.length, y: value[type] }
                            ))
                    }
                });
                setData(array);
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

    useEffect(() => {
        jsonFile();
    }, [type, yearvalue]);

    const value = {
        data,
        jsonFile,
        textY,
        textX,
        optionsData,
        year,
        selectYear,
        selectType
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
