import React from "react";

function Color(props) {
    return (<div style={{backgroundColor: props.color}} onClick={props.onClick}>
    </div>);
}

export default Color;