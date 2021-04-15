import React from 'react';
import { useApp } from '../context/appContext';

function SelectionType() {
    let { selectType, optionsData } = useApp();

    function getType(e) {
        selectType(document.getElementById('selectedType').value, e.target.options[e.target.selectedIndex].text);
    }

    const map = optionsData.map(element => {
        return <option key={ element.value} value={element.value}>{ element.text}</option>
    })
    return (
        <div className="form-group">
            <select id="selectedType" onChange={(e) => getType(e)} className="selctionType form-control col-4 col-sm-4 col-m-4 col-lg-4" aria-label="Default select example">
                {map}
            </select>
        </div>

    )
}

export default SelectionType;