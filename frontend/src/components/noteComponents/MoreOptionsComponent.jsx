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
                position={"right center"}
                nested
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
                        >
                            <div className="more-menu__category-list">
                                <button onClick={handleCategoryClick}>Category 1</button>
                                <button>Category 2</button>
                            </div>
                        </Popup>
                    </div>
                )}
            </Popup>
        </>
    )
}
