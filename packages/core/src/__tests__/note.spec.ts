import { test, assert } from "vitest";
import { NoteInput, NoteType, noteSchema } from "../note";
import { as } from "vitest/dist/reporters-5f784f42";

test("should pass validation when object matches schema", () => {
  const NoteInput: NoteInput = {
    content: "Test content",
    username: "Test User",
    noteType: NoteType.NOTE,
  };

  const result = noteSchema.safeParse(NoteInput);
  assert.isTrue(result.success);
});

test("should fail validation when object does not match schema, no content", () => {
  const NoteInput: NoteInput = {
    content: "",
    username: "Test User",
    noteType: NoteType.NOTE,
  };

  const result = noteSchema.safeParse(NoteInput);
  assert.isFalse(result.success);
});

test("should fail validation when object does not match schema, no username", () => {
  const NoteInput: NoteInput = {
    content: "dfgdfg",
    username: "",
    noteType: NoteType.NOTE,
  };

  const result = noteSchema.safeParse(NoteInput);
  assert.isFalse(result.success);
});

test("should fail validation when object does not match schema, incorrect Enum", () => {
  const NoteInput: NoteInput = {
    content: "dfgdfg",
    username: "dfgd",
    noteType: "ttss" as NoteType,
  };

  const result = noteSchema.safeParse(NoteInput);
  assert.isFalse(result.success);
});
