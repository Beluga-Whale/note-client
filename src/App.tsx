import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import NotesCard from "./components/NotesCard";
import api from "./api";
import Grid from "@mui/material/Grid";
import EditNoteDialog from "./components/EditNoteDialog";
import AddNoteDialog from "./components/AddNoteDialog";
import { Box, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState<boolean>(false);
  const [showNotesLoaddingError, setShowNotesLoaddingError] =
    useState<boolean>(false);

  const fetchNotes = async () => {
    try {
      setShowNotesLoaddingError(false);
      setNotesLoading(true);
      const response = await api.get("/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setShowNotesLoaddingError(true);
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box>
      <Grid container p={3}>
        <Grid item>
          <AddNoteDialog onNoteAdded={fetchNotes} />
        </Grid>
      </Grid>
      <Grid container spacing={2} p={3}>
        {showNotesLoaddingError && (
          <Typography>Something went wrong</Typography>
        )}
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <NotesCard note={note} onNoteAdded={fetchNotes} />
          </Grid>
        ))}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={notesLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <EditNoteDialog onNoteAdded={fetchNotes} />
      </Grid>
    </Box>
  );
};

export default App;
