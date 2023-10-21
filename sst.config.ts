import { SSTConfig } from "sst";
import { API } from "./stacks/APIStack";

export default {
  config(_input) {
    return {
      name: "serverless-api",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
