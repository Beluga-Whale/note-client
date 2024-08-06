import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import NotesCard from "./components/NotesCard";
import api from "./api";
import Grid from "@mui/material/Grid";
import AddNoteDialog from "./components/AddNoteDialog";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Grid container spacing={2} p={3}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note._id}>
          <NotesCard note={note} />
        </Grid>
      ))}
      <AddNoteDialog />
    </Grid>
  );
};

export default App;
