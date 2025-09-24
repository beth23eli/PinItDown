import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import Color from "./Color.jsx";

function CreateArea(props) {
  const colors = ["#fff","#a2d8fb", "#fbe0b4", "#ebcff6", "#b6f4d0"]

  const [actualColor, setActualColor] = useState("#fff");
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "#fff"
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

    note.color = noteColor;
  }

  function resetArea() {
    setNote({
      title: "",
      content: "",
      color: "#fff"
    });
    setActualColor("#fff");
  }

  function submitNote(event) {
    props.onAdd(note);
    resetArea()
    event.preventDefault();
  }


  function expand() {
    setExpanded(true);
  }

  useEffect(() => {
    if (props.toEdit && props.toEdit.id) {
      setNote({
        title: props.toEdit.title,
        content: props.toEdit.content,
        color: props.toEdit.color || "#fff"
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
        {isExpanded && (<div className="notes-colors">{colors.map((noteColor, index) => {
          return <Color key={index} id={index} color={noteColor} onClick={() => {handleColorChange(noteColor)}}/>
        })}</div>)}

  
        {props.toEdit && props.toEdit.id ? (<button className="update-btn" onClick={e => { e.preventDefault(); props.onUpdate({...note, id: props.toEdit.id }); resetArea();}}>Update</button>) : (
              <Zoom in={isExpanded}>
                <Fab sx={{backgroundColor: '#7c8f58ff'}} onClick={submitNote}>
                  <AddIcon/>
                </Fab>
              </Zoom>)
        }
      </form>
    </div>
  );
}

export default CreateArea;
