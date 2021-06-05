import React from 'react';
import { useApp } from '../context/appContext';

function SelectionYear() {
    let { year, selectYear } = useApp();

    function getYear(e) {
        selectYear(e.target.value, e.target.options[e.target.selectedIndex].text);
    }

    const map = year.map(element => {
        return <option key={ element.value} value={element.value}>{ element.text}</option>
    })
    return (
        <div className="form-group">
            <select onChange={(e) => getYear(e)} className="selctionType form-control col-4 col-sm-4 col-m-4 col-lg-4">
            <option className="form-control" key={'default'} defaultValue disabled >Select Year</option>
                {map}
            </select>
        </div>

    )
}

export default SelectionYear;
