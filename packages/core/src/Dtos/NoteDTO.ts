import { NoteType } from "../note";

export type NoteDTO = {
  id: string;
  content: string;
  username: string;
  noteType: NoteType;
  createdAt: Date;
};
