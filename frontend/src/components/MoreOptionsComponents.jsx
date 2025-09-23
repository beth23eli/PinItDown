import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClassIcon from '@mui/icons-material/Class';


export default function MoreMenuComponent(props) {

    function handleCategoryClick() {
        props.onCategoryClick()
    }


    return (
        <>
            <Popup
                trigger={<button><MoreVertIcon/></button>}
                position={"center left"}
                nested
                 className="more-menu"
            >
                <div className="more-menu">
                    <button onClick={props.onEditClick} className="note__buttons_btn"> 
                        <EditIcon/>
                    </button>

                    <Popup
                        trigger={<button><ClassIcon/></button>}
                        position={"top left"}
                        nested
                    >
                        <div className="more-menu__category-list">
                            <button onClick={handleCategoryClick}>Category 1</button>
                            <button>Category 2</button>
                        </div>
                    </Popup>
                </div>

            </Popup>
        </>
    )
}
