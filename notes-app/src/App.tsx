import React, { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const sampleNote = [
  {
    id: 1,
    title: "Test Note 1",
    content: "bla bla note1",
  },
  {
    id: 2,
    title: "Test Note 2 ",
    content: "bla bla note2",
  },
  {
    id: 3,
    title: "Test Note 3",
    content: "bla bla note3",
  },
  {
    id: 4,
    title: "Test Note 4 ",
    content: "bla bla note4",
  },
  {
    id: 5,
    title: "Test Note 5",
    content: "bla bla note5",
  },
  {
    id: 6,
    title: "Test Note 6",
    content: "bla bla note6",
  },
];

function App() {
  const [notes, setNotes] = useState<Note[]>(sampleNote);

  return (
    <div className="app-container">
      <form className="note-form">
        <input placeholder="Title" required />
        <textarea placeholder="Content" rows={10} required />

        <button type="submit">Add Note</button>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item">
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
