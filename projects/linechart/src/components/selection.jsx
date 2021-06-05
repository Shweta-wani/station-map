import React from 'react';
import { useApp } from '../context/appContext';
import SelectionMethod from './selectionDom';

function Selection() {
    let { selectStaion, selectType, selectYear, stations, year, optionsData } = useApp();

    function getValue(e) {
        e.preventDefault();
        return ({
            targetValue: e.target.value,
            targetText: e.target.options[e.target.selectedIndex].text
        })
    }

    return (
        <React.Fragment>
            <SelectionMethod
                value={stations}
                getType={(e) => selectStaion(getValue(e).targetValue, getValue(e).targetText)} />
            <SelectionMethod
                value={optionsData}
                getType={(e) => selectType(getValue(e).targetValue, getValue(e).targetText)} />
            <SelectionMethod
                value={year}
                getType={(e) => selectYear(getValue(e).targetValue, getValue(e).targetText)} />
        </React.Fragment>

    )
}

export default Selection;