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
      throttle: {
        rate: 5,
        burst: 10,
      },
      function: {
        bind: [table],
      },
    },
    routes: {
      "PUT /notes": "packages/functions/src/notes.createNoteHandler",
      "GET /notes/{username}":
        "packages/functions/src/notes.getNotesByUserHandler",
    },
  });

  api.bind([table]);
  api.attachPermissions([table]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
