import { randomUUID } from "crypto";
import { NoteEntity } from "../Data/Entities/NoteEntity";
import { NoteInput } from "../note";

export class NoteFactory {
  public static createNote(noteInput: NoteInput): NoteEntity {
    return {
      note_id: randomUUID(),
      note_content: noteInput.content,
      user_name: noteInput.username,
      note_type: noteInput.noteType,
      created_at: new Date().getTime(),
    };
  }
}
