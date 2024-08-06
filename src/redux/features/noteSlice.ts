import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Note as NoteModel } from "../../models/note";

export interface noteState {
  note: NoteModel;
  toggleDialogEdit: boolean;
}

const initialState: noteState = {
  note: {
    _id: "",
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
  },
  toggleDialogEdit: false,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setUpNote: (state, actions: PayloadAction<NoteModel>) => {
      state.note = actions.payload;
    },
    setToggleDialog: (state, action: PayloadAction<boolean>) => {
      state.toggleDialogEdit = action.payload;
    },
    setDefaultNote: (state) => {
      state.note = initialState.note;
    },
  },
});

export const { setUpNote, setDefaultNote, setToggleDialog } = noteSlice.actions;
export default noteSlice.reducer;
