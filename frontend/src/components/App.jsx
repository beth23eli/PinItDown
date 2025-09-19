import React, { useEffect, useState } from "react";
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

function App() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user_id = 1

  useEffect(() => {
    fetch(`http://localhost:8080/notes/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }
      return response.json()
    })
    .then(fetchedNotes => {
      setNotes(fetchedNotes)
      setAllNotes(fetchedNotes)
    })
    .catch(error => {
      console.error(error)
    });
  }, []);

  function addNote(newNote) {
    const noteToSend = {...newNote, user_id: 1};

    fetch("http://localhost:8080/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  
      },
      body: JSON.stringify(noteToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to save note");
      }
      return response.json()
    })
    .then(savedNote => {
      setNotes(prevNotes => [...prevNotes, savedNote]);
      setAllNotes(prevNotes => [...prevNotes, savedNote]);
    })
    .catch(error => {
      console.error(error)
    });
  }


  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => noteItem.id !== id);
    });

    setAllNotes(prevNotes => {
      return prevNotes.filter((noteItem) => noteItem.id !== id);
    });

    fetch(`http://localhost:8080/notes/${id}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      return response.json()
    })
    .catch(error => {
      console.error(error)
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
        {/* <Footer /> */}
      </div>
  );
}

export default App;
