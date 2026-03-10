import React, {useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MoreOptionsComponents from "./MoreOptionsComponent";
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';
import Popup from "reactjs-popup";
import { TextField } from "@mui/material";
import Select from 'react-select';


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
    let formatted = "";
    if (props.created_at) {
        const date = new Date(props.created_at);
        if (!isNaN(date)) {
            formatted = format(date, "HH:mm dd/MM/yyyy");
        }
    }
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [editDisabled, setEditDisabled] = useState(true)
    const [editTitle, setEditTitle] = useState("")
    const [editContent, setEditContent] = useState("")
    const [editCategory, setEditCategory] = useState("")
    


    function handleDeleteClick() {
        props.onDelete(props.id);
    }

    function handleEditClick() {
        props.onEdit(props.id, props.title, props.content, props.color, props.category_id);
    }

    function handleCategoryClick() {
        props.onCategoryClick()
    }

    useEffect(() => {
        if (open) {
            setEditTitle(props.title)
            setEditContent(props.content)
            setEditCategory(props.category_id)
        }
    }, [open, props.title, props.content, props.category_id])

    function handleSaveClick() {
        props.onUpdate({
            ...props.item,
            title: editTitle,
            content: editContent,
            category_id: editCategory || null
        })
    }

    function formatCategories() {
        return props.categories.map((category) => ({
            value: category.id,
            label: category.name
        }))
    }
    

    return (
        <>
            <div className="note"
                onDoubleClick={() => setOpen(true)}
                ref={setNodeRef}
                style={style}
                {...attributes}>
                    <Tooltip title={`${formatted}`} placement="top">
                        <div className={"note__content"}>
                            <div className="note__content__main-part">
                                <h1>{props.title}</h1>
                                <p className="cont">{props.content}</p>
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
                        onOpenNote={() => setOpen(true)}
                    />
                    <button onClick={handleDeleteClick} className="note__buttons__delete">
                        <DeleteIcon/>
                    </button>
                </div>
            </div> 
            <Popup
                position={"center center"}
                onClose={closeModal}
                open={open}
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
                className="extended-note"
                style={style}
            >
                <div className="extended-note__content">
                    <div className="top-part">
                        <TextField
                            value={editTitle}
                            disabled={editDisabled}
                            label={"Title"}
                            onChange={(e) => {setEditTitle(e.target.value)}}
                        />
                        <TextField
                            value={editContent}
                            disabled={editDisabled}
                            multiline
                            label={"Content"}
                            onChange={(e) => {setEditContent(e.target.value)}}
                        />
                    </div>
                    <a className="close" onClick={() => {
                        closeModal();
                        setEditDisabled(true);
                    }}>
                        &times;
                    </a>
                </div>
                <button onClick={() => {
                    if (editDisabled) {
                        setEditDisabled(false);
                    }
                    else {
                        handleSaveClick(); 
                        setEditDisabled(true);
                    }
                }} id={"edit-btn"}>
                    {editDisabled ? "Edit" : "Save"}
                </button>
                <div className="bottom-part">
                    {editDisabled ? 
                        <p className={props.category_name ? "note__content__category" : ''}>
                            {props.category_name}
                        </p> 
                        : 
                        <Select 
                            options={formatCategories()}
                            value={formatCategories().find(opt => opt.value === editCategory)}
                            onChange={option => setEditCategory(option ? option.value : null)}
                        />
                    }
                    <h4>{formatted}</h4>
                </div>                
            </Popup>
        </>
  );
}

export default Note;
