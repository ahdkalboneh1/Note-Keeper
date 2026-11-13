import "./App.css";
import { useState, useEffect } from "react";
import SearchField from "./components/SearchField/SearchField";
import NoteInput from "./components/NoteInput/NoteInput";
import NoteCard from "./components/NoteCard/NoteCard";

const colors = ["bg-yellow-100", "bg-pink-100", "bg-blue-100", "bg-green-100", "bg-purple-100"];

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    if (!savedNotes) {
      return [];
    }

    try {
      return JSON.parse(savedNotes).map((note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
      }));
    } catch {
      return [];
    }
  });

  const filteredNotes = notes
    .map((note, index) => ({ note, index }))
    .filter(({ note }) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.note.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function onUpdateNote(index, updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === index
          ? { ...note, ...updatedNote }
          : note
      )
    );
  }
  function onAddNote(props) {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        title: props.title,
        note: props.note,
        createdAt: new Date(),
        color: colors[prevNotes.length % colors.length],
      }
    ]
    );
  }

  function onDeleteNote(index) {
    setNotes((prevNotes) =>
      prevNotes.filter((note, i) => i !== index)
    );
  }

  return (
    <>

      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold p-3">My Note Keeper</h1>
        <SearchField
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm} />
      </div >
      <hr />

      <div className="flex justify-center pt-10">
        <NoteInput onAddNote={onAddNote} />
      </div>

      <div className="flex flex-wrap p-6 gap-3">
        {
          filteredNotes.map(({ note, index }) => (
            <NoteCard
              key={index}
              index={index}
              title={note.title}
              note={note.note}
              createdAt={note.createdAt}
              color={note.color}
              onUpdateNote={onUpdateNote}
              onDeleteNote={onDeleteNote}
            />
          ))
        }
      </div>
    </>
  );
}

export default App;
