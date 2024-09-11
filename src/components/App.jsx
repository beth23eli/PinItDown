import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    setAllNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    setAllNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const onDragEnd = (result) => {
    const {destination, source} = result;

    if(!destination) return;

    if (destination.index === source.index) {
      return;
    }

    const updatedNotes = Array.from(notes);
    const [movedNote] = updatedNotes.splice(source.index, 1);
    updatedNotes.splice(destination.index, 0, movedNote);

    setNotes(updatedNotes);
    setAllNotes(updatedNotes);
  }

  function handleSearch(value) {
    setSearchTerm(value);

    const filteredNotes = allNotes.filter(note =>
        note.title.toLowerCase().includes(value.toLowerCase()) ||
        note.content.toLowerCase().includes(value.toLowerCase())
    );

    setNotes(filteredNotes);
  }

  return (
      <div>
        <Header onSearch={handleSearch}/>
        <CreateArea onAdd={addNote} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="notes">
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ display: 'flex' }}
                >
                  {notes.map((noteItem, index) => (
                      <Draggable key={index} draggableId={`${index}`} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  marginBottom: '10px'
                                }}
                            >
                              <Note
                                  id={index}
                                  title={noteItem.title}
                                  content={noteItem.content}
                                  onDelete={deleteNote}
                                  color={noteItem.color}
                              />
                            </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
        <Footer />
      </div>
  );
}

export default App;
