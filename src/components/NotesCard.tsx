import { Note as NoteModel } from "../models/note";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
      <CardActions>{note.createdAt}</CardActions>
    </Card>
  );
};

export default NotesCard;
