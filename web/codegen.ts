import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:4000/api/graphiql",
  documents: ["app/**/*.tsx"],
  generates: {
    "app/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
