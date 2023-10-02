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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        title: title,
        content: content,
      },
    ]);
    setTitle("");
    setContent("");
  };

  const handleRemoveNote = (receiveId: number) => {
    const filteredNotes = notes.filter(note => note.id !== receiveId);
    setNotes(filteredNotes);
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={handleAddNote}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        <button type="submit">Add Note</button>
      </form>

      <div className="notes-grid">
        {notes.map(({ id, title, content }) => (
          <div className="note-item">
            <div className="notes-header">
              <button onClick={() => handleRemoveNote(id)}>x</button>
            </div>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
