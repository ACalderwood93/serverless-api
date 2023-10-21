import {
  getNotesByUser,
  insertNote,
} from "./../../core/src/Data/Repositories/NoteRepository";
import { ApiHandler } from "sst/node/api";
import { Table } from "sst/node/table";
import { API } from "../../../stacks/APIStack";
import { NoteInput, noteSchema } from "../../core/src/note";
export const createNoteHandler = ApiHandler(async (_evt) => {
  if (!_evt.body) {
    return {
      statusCode: 400,
      body: "No body provided",
    };
  }

  const note: NoteInput = JSON.parse(_evt.body);
  try {
    noteSchema.parse(note);
  } catch (e) {
    return {
      statusCode: 400,
      body: "Invalid note",
    };
  }

  await insertNote(note);
  return {
    statusCode: 201,
  };
});

export const getNotesByUserHandler = ApiHandler(async (_evt) => {
  const username = _evt.pathParameters?.username;
  console.log("path params", _evt.pathParameters);
  if (!username) {
    return {
      statusCode: 400,
      body: "No username provided",
    };
  }

  const notes = await getNotesByUser(username);

  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
});
