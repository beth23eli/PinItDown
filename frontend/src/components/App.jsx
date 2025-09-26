import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./noteComponents/Note";
import CreateArea from "./noteComponents/CreateArea";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";


function App() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [toEdit, SetToEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user_id = 1;
  const [allCategories, setAllCategories] = useState([]);


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
      fetchedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNotes(fetchedNotes)
      setAllNotes(fetchedNotes)
    })
    .catch(error => {
      console.error(error)
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/categories", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json()
    })
    .then(fetchedCategories => {
      setAllCategories(fetchedCategories)
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
      setNotes(prevNotes => [savedNote, ...prevNotes]);
      setAllNotes(prevNotes => [savedNote, ...prevNotes]);
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

  function updateNote(note) {
    fetch(`http://localhost:8080/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update note")
      }
      return response.json()
    })
    .then(updatedNote => {
      setNotes(prevNotes => [
        updatedNote,
        ...prevNotes.filter(n => n.id !== updatedNote.id)
      ]);
      setAllNotes(prevNotes => [
        updatedNote,
        ...prevNotes.filter(n => n.id !== updatedNote.id)
      ]);
      SetToEdit(false)
    })
    .catch(error => {
      console.error(error)
    });
  }

  function handleEdit(id, title, content, color, category_id) {
    SetToEdit({id, title, content, color, category_id})
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
        <CreateArea 
          onAdd={addNote}
          onUpdate={updateNote}
          toEdit={toEdit}
          categories={allCategories}
          onCancelEdit={() => SetToEdit(false)}
        />

        <SortableContext items={notes} strategy={horizontalListSortingStrategy}>
          <div className="allNotes">
            {notes.map((noteItem) => {
              const category = allCategories.find(cat => cat.id === noteItem.category_id);
              return (
                <Note
                  key={noteItem.id}
                  item={noteItem}
                  id={noteItem.id}
                  title={noteItem.title}
                  content={noteItem.content}
                  category_id={noteItem.category_id}
                  category_name={category ? category.name : ''}
                  created_at={noteItem.created_at}
                  onDelete={deleteNote}
                  onUpdate={updateNote}
                  onEdit={handleEdit}
                  color={noteItem.color}
                />
              );
            })}
          </div>
        </SortableContext>
      </div>
  );
}

export default App;
