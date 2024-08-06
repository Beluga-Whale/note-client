import { Note as NoteModel } from "../models/note";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

interface NotesCardProps {
  note: NoteModel;
}

const NotesCard = ({ note }: NotesCardProps) => {
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
      <CardActions sx={{ bgcolor: "#FDE069" }}>
        {dayjs(note.createdAt).format("DD/MM/YYYY  HH:MM:ss ")}
      </CardActions>
    </Card>
  );
};

export default NotesCard;
