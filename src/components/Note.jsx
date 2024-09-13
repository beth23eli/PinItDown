import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grip } from 'lucide-react';
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Note(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: props.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: props.color
    };

    function handleClick() {
        props.onDelete(props.id);
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
            <button {...listeners} className={"grip_button"}><Grip /></button>
            <button onClick={handleClick}>
                <DeleteIcon/>
            </button>
        </div>
    </div>
  );
}

export default Note;
