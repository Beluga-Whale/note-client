import { Button } from "@mui/material";
import { Note as NoteModel } from "../models/note";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setToggleDialog, setUpNote } from "../redux/features/noteSlice";
import Swal from "sweetalert2";
import api from "../api";
interface NotesCardProps {
  note: NoteModel;
  onNoteAdded: () => void;
}

const NotesCard = ({ note, onNoteAdded }: NotesCardProps) => {
  const dispatch = useDispatch();
  // const noteRedux = useSelector((state: RootState) => state.note);

  const handleClick = (noteData: NoteModel) => {
    dispatch(setUpNote(noteData));
    dispatch(setToggleDialog(true));
  };

  const handleDelete = (noteData: NoteModel) => {
    Swal.fire({
      title: `Delete : ${noteData?.title}`,
      text: ``,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`api/notes/${note._id}`).then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                onNoteAdded();
              }
            });
          }
        });
      }
    });
  };

  return (
    <Card sx={{ minWidth: 275, bgcolor: "#FAF5A4" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>

        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {note.text}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "flex-end", p: 0 }}>
        <Button variant="text" onClick={() => handleClick(note)}>
          Edit
        </Button>
        <Button variant="text" color="error" onClick={() => handleDelete(note)}>
          Delete
        </Button>
      </CardContent>
      <CardActions sx={{ bgcolor: "#FDE069" }}>
        {note.createdAt < note.updatedAt ? "Updated : " : "CreatedAt : "}{" "}
        {dayjs(note.createdAt).format("DD/MM/YYYY  HH:MM:ss ")}
      </CardActions>
    </Card>
  );
};

export default NotesCard;
