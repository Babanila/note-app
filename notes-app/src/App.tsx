import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

type FetchType = {
  baseUrl?: string;
  method?: string;
  data?: Record<string, any>;
  id?: number;
};

const dynamicFetch = async ({
  baseUrl = "http://localhost:8000/api/notes",
  method = "GET",
  data,
  id,
}: FetchType) => {
  let url = baseUrl;
  let inputData = null;

  if (id) {
    url = `${baseUrl}/${id}`;
  }

  if (data) {
    inputData = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: inputData,
    });

    if (method !== "DELETE") {
      return await response.json();
    }

    return response;
  } catch (e) {
    console.error(e);
  }
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const response: Note[] = await dynamicFetch({});
      setNotes(response);
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = await dynamicFetch({
      method: "POST",
      data: { title, content },
    });

    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleDeleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    await dynamicFetch({ method: "DELETE", id: noteId });
    const updatedNotes: Note[] | [] = notes.filter(
      (note) => note.id !== noteId
    );
    setNotes(updatedNotes);
  };

  const handleNoteClick = useCallback(
    (note: Note) => {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
    },
    [setTitle, setContent, setSelectedNote]
  );

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) return;

    const updatedNote: Note = await dynamicFetch({
      method: "PUT",
      data: { title, content },
      id: selectedNote.id,
    });

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
              <button onClick={(event) => handleDeleteNote(event, note.id)}>
                x
              </button>
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
