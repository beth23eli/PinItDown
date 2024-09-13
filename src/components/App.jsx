import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {
  DndContext,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addNote(newNote) {
    const noteWithId = { ...newNote, id: uuidv4() };

    setNotes(prevNotes => [...prevNotes, noteWithId]);
    setAllNotes(prevNotes => [...prevNotes, noteWithId]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => noteItem.id !== id);
    });

    setAllNotes(prevNotes => {
      return prevNotes.filter((noteItem) => noteItem.id !== id);
    });
  }

  const handleDragEnd = (event) => {
    const {active, over} = event;

    if(active?.id !== over?.id) {
      setNotes((prev) => {
        const activeIndex = prev.findIndex((item) => item.id === active?.id);
        const overIndex = prev.findIndex((item) => item.id === over?.id);

        return arrayMove(prev, activeIndex, overIndex);
      });
    }
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

        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={notes} strategy={horizontalListSortingStrategy}>
            <div className="allNotes">
              {notes.map((noteItem) => (
                  <Note
                      key={noteItem.id}
                      item={noteItem}
                      id={noteItem.id}
                      title={noteItem.title}
                      content={noteItem.content}
                      onDelete={deleteNote}
                      color={noteItem.color}
                  />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Footer />
      </div>
  );
}

export default App;
