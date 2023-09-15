import invariant from "tiny-invariant";
import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";
import { getToken } from "~/utils/auth.server";

const getRecipesQuery = graphql(`
  query GetRecipes($query: String, $mealPlanOnly: Boolean) {
    currentUser {
      recipes(query: $query, mealPlanOnly: $mealPlanOnly) {
        id
        name
        totalTime
        imageUrl
        mealPlanMultiplier
      }
    }
  }
`);

export async function getRecipes(
  request: Request,
  query: string | null,
  mealPlanOnly: boolean
) {
  return backendRequest({
    token: await getToken(request),
    document: getRecipesQuery,
    variables: { query, mealPlanOnly },
  });
}

const createRecipeQuery = graphql(`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      success
      data {
        id
      }
      errors {
        message
        path
      }
    }
  }
`);

export async function createRecipe(request: Request) {
  const result = await backendRequest({
    token: await getToken(request),
    document: createRecipeQuery,
    variables: {
      input: {
        name: "New Recipe",
        totalTime: "0 min",
        imageUrl: "https://via.placeholder.com/150?text=Placeholder",
      },
    },
  });

  invariant(result?.createRecipe?.data?.id);

  return result.createRecipe.data.id;
}

const clearMealPlanQuery = graphql(`
  mutation ClearMealPlan {
    clearMealPlan {
      success
    }
  }
`);

export async function clearMealPlan(request: Request) {
  return backendRequest({
    token: await getToken(request),
    document: clearMealPlanQuery,
  });
}
