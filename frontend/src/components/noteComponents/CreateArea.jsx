import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import ColorPicker from "./Color.jsx";
import ClassIcon from '@mui/icons-material/Class';
import Popup from 'reactjs-popup';
import Tooltip from '@mui/material/Tooltip';
import NoteEditBar from "./noteEditBar.jsx";


function CreateArea(props) {
  const [actualColor, setActualColor] = useState("#fff");
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "#fff",
    category_id: null
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleColorChange(noteColor) {
    setActualColor(noteColor);

    setNote(prevNote => ({
      ...prevNote,
      color: noteColor
    }));
  }

  function resetArea() {
    setNote({
      title: "",
      content: "",
      color: "#fff",
      category_id: null
    });
    setActualColor("#fff");
  }

  function submitNote(event) {
    props.onAdd(note);
    resetArea();
    collapse();
    event.preventDefault();
  }


  function expand() {
    setExpanded(true);
  }

  function collapse() {
    setExpanded(false);
  }

  function handleCategoryClick(categoryId) {
    setNote(prevNote => ({
      ...prevNote,
      category_id: categoryId
    }));
  }

  useEffect(() => {
    if (props.toEdit && props.toEdit.id) {
      setNote({
        title: props.toEdit.title,
        content: props.toEdit.content,
        color: props.toEdit.color || "#fff",
        category_id: props.toEdit.category_id || null
      });
      setActualColor(props.toEdit.color)
      setExpanded(true)
    }
  }, [props.toEdit])

  return (
    <div>
      <form className="create-note" style={{backgroundColor: actualColor}}>
        {isExpanded && (
            <input
                name="title"
                onChange={handleChange}
                value={note.title}
                placeholder="Title"
                style={{backgroundColor: actualColor}}
            />
        )}

        <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
            style={{backgroundColor: actualColor}}
        />
        {isExpanded && (
          <div className="note-options">
              <ColorPicker color={actualColor} onChange={handleColorChange}/>

              <Popup
                trigger={<Tooltip title="Note category"><ClassIcon className="categories-btn"></ClassIcon></Tooltip>}
                position={"bottom center"}
                nested
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
              >
                {close => (
                  <div className="categories-list">
                    {props.categories.map((categoryItem) => (
                      <p 
                        onClick={() => {handleCategoryClick(categoryItem.id); close();}} 
                        key={categoryItem.id}
                        style={{ cursor: 'pointer', fontWeight: note.category_id === categoryItem.id ? 'bold' : 'normal' }}
                      >
                        {categoryItem.name}
                      </p>
                    ))}
                  </div>
                )}
              </Popup>
          </div>
        )}
      
        {props.toEdit && props.toEdit.id ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="update-btns cancel-btn"
              onClick={e => {
                e.preventDefault();
                resetArea();
                collapse();
                props.onCancelEdit();
              }}
            >
              Cancel
            </button>
            <button
              className="update-btns"
              onClick={e => {
                e.preventDefault();
                props.onUpdate({ ...note, id: props.toEdit.id });
                resetArea();
                collapse();
              }}
            >
              Update
            </button>
          </div>
        ) : (
              <Zoom in={isExpanded}>
                <Fab sx={{backgroundColor: '#7c8f58ff'}} onClick={submitNote}>
                  <AddIcon/>
                </Fab>
              </Zoom>
            )
        }
      </form>
    </div>
  );
}

export default CreateArea;
