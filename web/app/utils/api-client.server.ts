import { GraphQLClient } from "graphql-request";

type QueryArgs = {
  query: string;
  variables?: { [key: string]: string | null | { [key: string]: string } };
};

export function sendQuery({ query, variables }: QueryArgs) {
  return fetch("http://127.0.0.1:4000/api/graphiql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
}

type MutationArgs = QueryArgs;
export async function sendMutation({ query, variables }: MutationArgs) {
  const response = await sendQuery({ query, variables });
  return response.json();
}

export const client = new GraphQLClient("http://127.0.0.1:4000/api/graphiql");
