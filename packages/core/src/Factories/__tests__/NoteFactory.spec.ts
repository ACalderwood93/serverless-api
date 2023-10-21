import { randomUUID } from "crypto";
import { NoteFactory } from "../NoteFactory";
import { NoteType } from "../../note";
import { assert, test } from "vitest";

test("should create a valid NoteEntity object", () => {
  // Arrange
  const noteInput = {
    content: "Test content",
    username: "Test User",
    noteType: NoteType.NOTE,
  };

  // Act
  const noteEntity = NoteFactory.createNote(noteInput);

  // Assert
  assert.isNotNull(noteEntity);
  assert.isNotNull(noteEntity.note_id);
  assert.equal(noteEntity.note_content, noteInput.content);
  assert.equal(noteEntity.user_name, noteInput.username);
  assert.equal(noteEntity.note_type, noteInput.noteType);
  assert.isAbove(noteEntity.created_at, 0);
});

test("should create a valid NoteDTO object", () => {
  // Arrange
  const noteEntity = {
    note_id: randomUUID(),
    note_content: "Test content",
    user_name: "Test User",
    note_type: NoteType.NOTE,
    created_at: new Date().getTime(),
  };

  // Act
  const noteDTO = NoteFactory.createNoteDTO(noteEntity);

  // Assert
  assert.isNotNull(noteDTO);
  assert.equal(noteDTO.id, noteEntity.note_id);
  assert.equal(noteDTO.content, noteEntity.note_content);
  assert.equal(noteDTO.username, noteEntity.user_name);
  assert.equal(
    noteDTO.noteType,
    NoteType[noteEntity.note_type as keyof typeof NoteType]
  );
  assert.closeTo(
    noteDTO.createdAt.getTime(),
    new Date(noteEntity.created_at).getTime(),
    1000
  );
});
