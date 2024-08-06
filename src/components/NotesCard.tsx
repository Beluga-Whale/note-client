import { Button } from "@mui/material";
import { Note as NoteModel } from "../models/note";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setToggleDialog, setUpNote } from "../redux/features/noteSlice";

interface NotesCardProps {
  note: NoteModel;
}

const NotesCard = ({ note }: NotesCardProps) => {
  const dispatch = useDispatch();
  // const noteRedux = useSelector((state: RootState) => state.note);

  const handleClick = (noteData: NoteModel) => {
    dispatch(setUpNote(noteData));
    dispatch(setToggleDialog(true));
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
        <Button variant="text" color="error" onClick={() => handleClick(note)}>
          Delete
        </Button>
      </CardContent>
      <CardActions sx={{ bgcolor: "#FDE069" }}>
        {note.createdAt < note.updatedAt ? "CreatedAt : " : "Updated : "}{" "}
        {dayjs(note.createdAt).format("DD/MM/YYYY  HH:MM:ss ")}
      </CardActions>
    </Card>
  );
};

export default NotesCard;
