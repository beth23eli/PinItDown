import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MoreOptionsComponents from "./MoreOptionsComponent";


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
        <div className={"note__content"}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
        <div className={"note__buttons"}>
            <MoreOptionsComponents
                onEditClick={handleEditClick}
                onCategoryClick={handleCategoryClick}
            />
            <button onClick={handleDeleteClick} className="note__buttons_btn">
                <DeleteIcon/>
            </button>
        </div>
    </div>
    
  );
}

export default Note;
