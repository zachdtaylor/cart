import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";
import { getToken } from "~/utils/auth.server";

const updateRecipeQuery = graphql(`
  mutation UpdateRecipe($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
      success
    }
  }
`);

export async function addToMealPlan(
  request: Request,
  id: string,
  mealPlanMultiplier: number
) {
  return backendRequest({
    token: await getToken(request),
    document: updateRecipeQuery,
    variables: { input: { id, mealPlanMultiplier } },
  });
}

export async function removeFromMealPlan(request: Request, id: string) {
  return backendRequest({
    token: await getToken(request),
    document: updateRecipeQuery,
    variables: { input: { id, mealPlanMultiplier: null } },
  });
}
