import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";
import { getToken } from "~/utils/auth.server";

const discoverDetailPageQuery = graphql(`
  query DiscoverDetailPage($id: ID!) {
    currentUser {
      id
    }
    recipe(id: $id) {
      id
      copiedByCurrentUser
      name
      imageUrl
      totalTime
      instructions
      ingredients {
        id
        name
        amount
      }
      user {
        id
      }
    }
  }
`);

export async function getDiscoverDetailPageData(request: Request, id: string) {
  return backendRequest(
    {
      token: await getToken(request),
      document: discoverDetailPageQuery,
      variables: { id },
    },
    {
      onUnauthorized: () => {},
    }
  );
}

const saveToRecipeBookQuery = graphql(`
  mutation SaveToRecipeBook($recipeId: ID!) {
    copyRecipe(recipeId: $recipeId) {
      success
      errors {
        message
        path
      }
    }
  }
`);

export async function saveToRecipeBook(request: Request, recipeId: string) {
  return backendRequest({
    token: await getToken(request),
    document: saveToRecipeBookQuery,
    variables: { recipeId },
  });
}
