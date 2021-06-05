import React from "react";
import { useApp } from "../context/appContext";

export const LabelX = () => {
    const { textX } = useApp();
    const classes = ['style']
    return (
        <div>
            <span className={classes.join(' ')}>{textX}</span> 
        </div>
    )
};

export const LabelY = () => {
    const { textY } = useApp();
    const classes = ['style','labelPositionY']
    return (
        <div>
            <span className={classes.join(' ')}>{textY}</span>
        </div>
    )
};
