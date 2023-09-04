import type {
  CreateIngredientInput,
  UpdateRecipeInput,
} from "~/graphql-codegen/graphql";
import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";
import { getToken } from "~/utils/auth.server";

const getRecipeQuery = graphql(`
  query GetRecipe($id: ID!) {
    currentUser {
      recipe(id: $id) {
        id
        name
        totalTime
        imageUrl
        mealPlanMultiplier
        instructions
        ingredients {
          id
          name
          amount
        }
      }
    }
  }
`);

export async function getRecipe(request: Request, id: string) {
  return backendRequest({
    token: await getToken(request),
    document: getRecipeQuery,
    variables: { id },
  });
}

const deleteRecipeQuery = graphql(`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(input: { recipeId: $id }) {
      success
    }
  }
`);

export async function deleteRecipe(request: Request, id: string) {
  return backendRequest({
    token: await getToken(request),
    document: deleteRecipeQuery,
    variables: { id },
  });
}

const deleteIngredientQuery = graphql(`
  mutation DeleteIngredient($id: ID!) {
    deleteIngredient(input: { ingredientId: $id }) {
      success
    }
  }
`);

export async function deleteIngredient(request: Request, id: string) {
  return backendRequest({
    token: await getToken(request),
    document: deleteIngredientQuery,
    variables: { id },
  });
}

const updateRecipeQuery = graphql(`
  mutation UpdateRecipe($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
      success
    }
  }
`);

export async function saveRecipe(request: Request, input: UpdateRecipeInput) {
  return backendRequest({
    token: await getToken(request),
    document: updateRecipeQuery,
    variables: { input },
  });
}

export async function saveName(request: Request, id: string, name: string) {
  return backendRequest({
    token: await getToken(request),
    document: updateRecipeQuery,
    variables: { input: { id, name } },
  });
}

export async function saveTotalTime(
  request: Request,
  id: string,
  totalTime: string
) {
  return backendRequest({
    token: await getToken(request),
    document: updateRecipeQuery,
    variables: { input: { id, totalTime } },
  });
}

export async function saveInstructions(
  request: Request,
  id: string,
  instructions: string
) {
  return backendRequest({
    token: await getToken(request),
    document: updateRecipeQuery,
    variables: { input: { id, instructions } },
  });
}

const createIngredientQuery = graphql(`
  mutation CreateIngredient($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      success
    }
  }
`);

export async function createIngredient(
  request: Request,
  input: CreateIngredientInput
) {
  return backendRequest({
    token: await getToken(request),
    document: createIngredientQuery,
    variables: { input },
  });
}

const updateIngredientQuery = graphql(`
  mutation UpdateIngredient($input: UpdateIngredientInput!) {
    updateIngredient(input: $input) {
      success
    }
  }
`);

export async function saveIngredientName(
  request: Request,
  id: string,
  name: string
) {
  return backendRequest({
    token: await getToken(request),
    document: updateIngredientQuery,
    variables: { input: { id, name } },
  });
}

export async function saveIngredientAmount(
  request: Request,
  id: string,
  amount: string | null
) {
  return backendRequest({
    token: await getToken(request),
    document: updateIngredientQuery,
    variables: { input: { id, amount } },
  });
}
