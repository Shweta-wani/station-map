import React from 'react';
import { useApp } from '../context/appContext';

function SelectionYear() {
    let { year, selectYear } = useApp();

    function getYear(e) {
        selectYear(document.getElementById('selectedYear').value, e.target.options[e.target.selectedIndex].text);
    }

    const map = year.map(element => {
        return <option key={ element.value} value={element.value}>{ element.text}</option>
    })
    return (
        <div className="form-group">
            <select id="selectedYear" onChange={(e) => getYear(e)} className="selctionType form-control col-sm-6 col-m-4 col-lg-4">
                {map}
            </select>
        </div>

    )
}

export default SelectionYear;
