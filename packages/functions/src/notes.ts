import {
  getNotesByUser,
  insertNote,
} from "./../../core/src/Data/Repositories/NoteRepository";
import { ApiHandler } from "sst/node/api";
import { NoteInput, noteSchema } from "../../core/src/note";
import { NoteFactory } from "@serverless-api/core/Factories/NoteFactory";
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
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
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

  if (notes.length === 0) {
    return {
      statusCode: 404,
      body: "No notes found",
    };
  }

  const noteDtos = notes.map((note) => NoteFactory.createNoteDTO(note));
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteDtos),
  };
});
