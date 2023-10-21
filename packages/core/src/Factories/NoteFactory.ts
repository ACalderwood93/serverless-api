import { randomUUID } from "crypto";
import { NoteEntity } from "../Data/Entities/NoteEntity";
import { NoteInput, NoteType } from "../note";
import { NoteDTO } from "../Dtos/NoteDTO";

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
  public static createNoteDTO(noteEntity: NoteEntity): NoteDTO {
    return {
      id: noteEntity.note_id,
      content: noteEntity.note_content,
      username: noteEntity.user_name,
      noteType: NoteType[noteEntity.note_type as keyof typeof NoteType],
      createdAt: new Date(noteEntity.created_at),
    };
  }
}
