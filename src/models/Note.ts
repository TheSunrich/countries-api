import { Schema, Model, model } from 'mongoose';
import { IStatus, StatusSchema } from "./Status";

interface INote {
    title: string;
    content: string;
}

type NoteModel = Model<INote>

const NoteSchema: Schema = new Schema<INote, NoteModel>({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const Note: NoteModel = model<INote, NoteModel>('Note', NoteSchema);

export default Note;