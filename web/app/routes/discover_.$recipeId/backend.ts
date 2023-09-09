import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";

const recipeQuery = graphql(`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      name
      imageUrl
      totalTime
      instructions
      ingredients {
        id
        name
        amount
      }
    }
  }
`);

export function getRecipe(id: string) {
  return backendRequest({ document: recipeQuery, variables: { id } });
}
