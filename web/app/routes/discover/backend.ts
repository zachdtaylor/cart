import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";

const recipesQuery = graphql(`
  query Recipes($limit: Int) {
    recipes(limit: $limit) {
      nodes {
        id
        name
        imageUrl
        user {
          fullName
        }
      }
    }
  }
`);

export function getRecipes() {
  return backendRequest({ document: recipesQuery, variables: { limit: 25 } });
}
