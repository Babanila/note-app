import React, { useCallback, useState } from "react";
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
];

function App() {
  const [notes, setNotes] = useState<Note[]>(sampleNote);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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
    const filteredNotes = notes.filter((note) => note.id !== receiveId);
    setNotes(filteredNotes);
  };

  const handleNoteClick = useCallback((note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }, [setTitle, setContent, setSelectedNote]);

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = useCallback(() => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }, [setTitle, setContent, setSelectedNote]);

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
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

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={() => handleRemoveNote(note.id)}>x</button>
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
