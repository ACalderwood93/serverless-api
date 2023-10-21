import { ApiHandler } from "sst/node/api";
import { Table } from "sst/node/table";
import { API } from "../../../stacks/APIStack";
export const createNoteHandler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world. The time is ${Table.Notes.tableName}`,
  };
});
