import React from "react";
import { useApp } from "../context/appContext";

const style = {
    display: "inline-block",
    width: '100%',
    textAlign: 'center',
    color: "#000",
};

const labelPostionY = {
    textAlign: 'left',
    marginLeft:'20px'
   
}

export const LabelX = () => {
    const { textX} = useApp();
    return (
        <div>
            <span style={{ ...style}}>{textX}</span> 
        </div>
    )
};
export const LabelY = () => {
    const { textY } = useApp();
    return (
        <div>
            <span style={{ ...style, ...(labelPostionY) }}>{textY}</span>
        </div>
    )
};


