import React from "react";
import { SwatchesPicker } from 'react-color';
import Popup from "reactjs-popup";


export default function ColorPicker({color, onChange}) {
    return (
        <Popup 
            trigger={<div style={{backgroundColor: "#fff"}}/>}
            position={"bottom center"}
            nested
            closeOnDocumentClick
        >
            {close => (
                <SwatchesPicker
                    color={color}
                    onChange={c => {
                        onChange(c.hex);
                        close();
                    }}
                />
            )}
        </Popup>
    );
}