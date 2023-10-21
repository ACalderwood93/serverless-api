import { StackContext, Api, EventBus, Table } from "sst/constructs";

export function API({ stack }: StackContext) {
  const table = new Table(stack, "Notes", {
    fields: {
      note_id: "string",
      note_content: "string",
      note_type: "string",
      user_name: "string",
      created_at: "number",
    },
    primaryIndex: { partitionKey: "user_name", sortKey: "created_at" },
    localIndexes: {
      note_types: { sortKey: "note_type" },
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /notes": "packages/functions/src/notes.createNoteHandler",
    },
  });

  api.bind([table]);
  api.attachPermissions([table]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
