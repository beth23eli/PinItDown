import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MoreOptionsComponents from "./MoreOptionsComponent";
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';




function Note(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: props.color,
    };
    const date = new Date([props.created_at]);
    const formatted = format(date, "HH:mm dd/MM/yyyy");


    function handleDeleteClick() {
        props.onDelete(props.id);
    }

    function handleEditClick() {
        props.onEdit(props.id, props.title, props.content, props.color, props.category_id);
    }

    function handleCategoryClick() {
        props.onCategoryClick()
    }

    

  return (
    <div className="note"
         ref={setNodeRef}
         style={style}
         {...attributes}>
            <Tooltip title={`${formatted}`} placement="top">
                <div className={"note__content"}>
                    <div className="note__content__main-part">
                        <h1>{props.title}</h1>
                        <p>{props.content}</p>
                    </div>
                    <p className={props.category_name ? "note__content__category" : ''}>
                        {props.category_name}
                    </p>
                </div>
            </Tooltip>
        <div className={"note__buttons"}>
            <MoreOptionsComponents
                onEditClick={handleEditClick}
                onCategoryClick={handleCategoryClick}
            />
            <button onClick={handleDeleteClick} className="note__buttons__delete">
                <DeleteIcon/>
            </button>
        </div>
    </div>
    
  );
}

export default Note;
