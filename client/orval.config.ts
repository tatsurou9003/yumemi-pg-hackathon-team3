import { defineConfig } from "orval";

export default defineConfig({
  waLive: {
    input: {
      target: "../server/http_schema.yml",
    },
    output: {
      mode: "tags-split",
      clean: true,
      client: "axios",
      target: "src/hooks/orval",
      /*override: {
        mutator: {
          path: "src/lib/custom-instance.ts",
          name: "customInstance",
        },
      },*/
      prettier: true,
    },
  },
});
