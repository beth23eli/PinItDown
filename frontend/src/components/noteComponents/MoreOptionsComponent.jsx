import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function MoreMenuComponent(props) {


    return (
        <>
            <Popup
                trigger={<button><MoreVertIcon/></button>}
                position={"right center"}
                nested
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
                closeOnDocumentClick
            >
                {close => (
                    <div className="more-menu">
                        <button onClick={() => {
                            props.onEditClick();
                            close();
                        }} 
                        className="note__buttons_btn"> 
                            <EditIcon/>
                        </button>
                        
                        <button onClick={() => {props.onOpenNote(); close()}}>
                            <OpenInNewIcon/>
                        </button>
                    </div>
                )}
            </Popup>
        </>
    )
}
