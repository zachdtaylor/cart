import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:4000/api/graphql",
  documents: ["app/**/*.tsx", "app/**/*.ts"],
  generates: {
    "app/graphql-codegen/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
