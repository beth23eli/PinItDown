import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClassIcon from '@mui/icons-material/Class';


export default function MoreMenuComponent(props) {


    return (
        <>
            <Popup
                trigger={<button><MoreVertIcon/></button>}
                position={"right center"}
                nested
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
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

                        <Popup
                            trigger={<button className="note__buttons_btn"><ClassIcon/></button>}
                            position={"bottom center"}
                            nested
                            overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
                        >
                            <div className="more-menu__category-list">
                                <button>Category 2</button>
                            </div>
                        </Popup>
                    </div>
                )}
            </Popup>
        </>
    )
}
