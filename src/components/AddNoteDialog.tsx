import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Note as NoteModel } from "../models/note";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setDefaultNote, setToggleDialog } from "../redux/features/noteSlice";
import api from "../api";

const AddNoteDialog = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.note.toggleDialogEdit);
  const noteRedux = useSelector((state: RootState) => state.note.note);
  const [note, setNote] = useState<NoteModel | undefined>(undefined);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get(`/api/notes/${noteRedux._id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [noteRedux]);

  const handleClose = () => {
    dispatch(setToggleDialog(false));
    dispatch(setDefaultNote());
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { title, text } = formJson;

    await api.post(`/api/notes/${noteRedux._id}`, {
      title,
      text,
    });

    handleClose();
  };
  return (
    <>
      <Dialog
        key={note?._id}
        open={toggle}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Edit note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            defaultValue={note?.title ?? ""}
          />
          <TextField
            autoFocus
            margin="dense"
            name="text"
            label="Text"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            defaultValue={note?.text ?? ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNoteDialog;
