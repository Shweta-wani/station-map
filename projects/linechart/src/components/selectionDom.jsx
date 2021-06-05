import React from "react";

export default function SelectionDom(props) {

    const map = props.value.map(element => {
        return <option className="form-control" key={element.value} value={element.value}>{element.text}</option>
    });   

    return (
        <div className="form-group">
            <select onChange={(e) => props.getType(e)} className="selctionType form-control col-4 col-sm-4 col-m-4 col-lg-4" aria-label="Default select example">
                {map}
            </select>
        </div>
    ) 
}