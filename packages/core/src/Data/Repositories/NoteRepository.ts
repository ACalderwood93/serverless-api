import { NoteFactory } from "../../Factories/NoteFactory";
import { NoteInput } from "../../note";
import { Table } from "sst/node/table";
import { DynamoDB } from "aws-sdk";
import { NoteEntity } from "../Entities/NoteEntity";

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

export const getNotesByUser = async (
  username: string
): Promise<NoteEntity[]> => {
  const result = await client
    .query({
      TableName: Table.Notes.tableName,
      KeyConditionExpression: "user_name = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    })
    .promise();

  return result.Items as NoteEntity[];
};
