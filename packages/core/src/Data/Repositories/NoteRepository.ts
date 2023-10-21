import { NoteFactory } from "../../Factories/NoteFactory";
import { NoteInput } from "../../note";
import { Table } from "sst/node/table";
import { DynamoDB } from "aws-sdk";

const client = new DynamoDB.DocumentClient();

export const insertNote = async (input: NoteInput) => {
  const newNote = NoteFactory.createNote(input);

  await client
    .put({
      TableName: Table.Notes.tableName,
      Item: newNote,
    })
    .promise();
};
