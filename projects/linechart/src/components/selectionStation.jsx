import React from 'react';
import { useApp } from '../context/appContext';

function SelectionStation() {
    let { selectStaion, stations } = useApp();

    function getType(e) {
        selectStaion(e.target.value, e.target.options[e.target.selectedIndex].text);
    }

    const map = stations.map(element => {
        return <option className="form-control" key={ element.stationsId} value={element.stationsId}>{ element.stationsName}</option>
    })
    return (
        <div className="form-group">
            <select onChange={(e) => getType(e)} className="selctionType form-control col-4 col-sm-4 col-m-4 col-lg-4" aria-label="Default select example">
            <option className="form-control" key={'default'} defaultValue disabled >Select Station</option>
                {map}
            </select>
        </div>

    )
}

export default SelectionStation;