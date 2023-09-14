/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GroceryListItems {\n    currentUser {\n      groceryListItems {\n        id\n        name\n        uses {\n          id\n          amount\n          recipeName\n          multiplier\n        }\n      }\n    }\n  }\n": types.GroceryListItemsDocument,
    "\n  mutation CheckOffItem($input: CheckOffGroceryListItemInput!) {\n    checkOffGroceryListItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.CheckOffItemDocument,
    "\n  query GetAllShelves($query: String) {\n    currentUser {\n      pantryShelves(query: $query) {\n        id\n        name\n        items {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetAllShelvesDocument,
    "\n  mutation CreateShelf($input: CreatePantryShelfInput!) {\n    createPantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.CreateShelfDocument,
    "\n  mutation DeleteShelf($input: DeletePantryShelfInput!) {\n    deletePantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.DeleteShelfDocument,
    "\n  mutation UpdateShelfName($input: UpdatePantryShelfNameInput!) {\n    updatePantryShelfName(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.UpdateShelfNameDocument,
    "\n  mutation CreatePantryItem($input: CreatePantryItemInput!) {\n    createPantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.CreatePantryItemDocument,
    "\n  mutation DeletePantryItem($input: DeletePantryItemInput!) {\n    deletePantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.DeletePantryItemDocument,
    "\n  mutation UpdateRecipe($input: UpdateRecipeInput!) {\n    updateRecipe(input: $input) {\n      success\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  query GetRecipe($id: ID!) {\n    currentUser {\n      recipe(id: $id) {\n        id\n        name\n        totalTime\n        imageUrl\n        mealPlanMultiplier\n        instructions\n        ingredients {\n          id\n          name\n          amount\n        }\n      }\n    }\n  }\n": types.GetRecipeDocument,
    "\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(input: { recipeId: $id }) {\n      success\n    }\n  }\n": types.DeleteRecipeDocument,
    "\n  mutation DeleteIngredient($id: ID!) {\n    deleteIngredient(input: { ingredientId: $id }) {\n      success\n    }\n  }\n": types.DeleteIngredientDocument,
    "\n  mutation CreateIngredient($input: CreateIngredientInput!) {\n    createIngredient(input: $input) {\n      success\n    }\n  }\n": types.CreateIngredientDocument,
    "\n  mutation UpdateIngredient($input: UpdateIngredientInput!) {\n    updateIngredient(input: $input) {\n      success\n    }\n  }\n": types.UpdateIngredientDocument,
    "\n  query GetRecipes($query: String, $mealPlanOnly: Boolean) {\n    currentUser {\n      recipes(query: $query, mealPlanOnly: $mealPlanOnly) {\n        id\n        name\n        totalTime\n        imageUrl\n        mealPlanMultiplier\n      }\n    }\n  }\n": types.GetRecipesDocument,
    "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      success\n      data {\n        id\n      }\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.CreateRecipeDocument,
    "\n  mutation ClearMealPlan {\n    clearMealPlan {\n      success\n    }\n  }\n": types.ClearMealPlanDocument,
    "\n  query Recipes($limit: Int) {\n    recipes(limit: $limit) {\n      nodes {\n        id\n        name\n        imageUrl\n        user {\n          fullName\n        }\n      }\n    }\n  }\n": types.RecipesDocument,
    "\n  query Recipe($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      imageUrl\n      totalTime\n      instructions\n      ingredients {\n        id\n        name\n        amount\n      }\n    }\n  }\n": types.RecipeDocument,
    "\n  mutation LogIn($input: LogInUserInput!) {\n    logInUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n": types.LogInDocument,
    "\n  mutation Register($input: RegisterUserInput!) {\n    registerUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n": types.RegisterDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroceryListItems {\n    currentUser {\n      groceryListItems {\n        id\n        name\n        uses {\n          id\n          amount\n          recipeName\n          multiplier\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroceryListItems {\n    currentUser {\n      groceryListItems {\n        id\n        name\n        uses {\n          id\n          amount\n          recipeName\n          multiplier\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CheckOffItem($input: CheckOffGroceryListItemInput!) {\n    checkOffGroceryListItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckOffItem($input: CheckOffGroceryListItemInput!) {\n    checkOffGroceryListItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllShelves($query: String) {\n    currentUser {\n      pantryShelves(query: $query) {\n        id\n        name\n        items {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllShelves($query: String) {\n    currentUser {\n      pantryShelves(query: $query) {\n        id\n        name\n        items {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateShelf($input: CreatePantryShelfInput!) {\n    createPantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateShelf($input: CreatePantryShelfInput!) {\n    createPantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteShelf($input: DeletePantryShelfInput!) {\n    deletePantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteShelf($input: DeletePantryShelfInput!) {\n    deletePantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateShelfName($input: UpdatePantryShelfNameInput!) {\n    updatePantryShelfName(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateShelfName($input: UpdatePantryShelfNameInput!) {\n    updatePantryShelfName(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePantryItem($input: CreatePantryItemInput!) {\n    createPantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePantryItem($input: CreatePantryItemInput!) {\n    createPantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePantryItem($input: DeletePantryItemInput!) {\n    deletePantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePantryItem($input: DeletePantryItemInput!) {\n    deletePantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRecipe($input: UpdateRecipeInput!) {\n    updateRecipe(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipe($input: UpdateRecipeInput!) {\n    updateRecipe(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecipe($id: ID!) {\n    currentUser {\n      recipe(id: $id) {\n        id\n        name\n        totalTime\n        imageUrl\n        mealPlanMultiplier\n        instructions\n        ingredients {\n          id\n          name\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecipe($id: ID!) {\n    currentUser {\n      recipe(id: $id) {\n        id\n        name\n        totalTime\n        imageUrl\n        mealPlanMultiplier\n        instructions\n        ingredients {\n          id\n          name\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(input: { recipeId: $id }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(input: { recipeId: $id }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteIngredient($id: ID!) {\n    deleteIngredient(input: { ingredientId: $id }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteIngredient($id: ID!) {\n    deleteIngredient(input: { ingredientId: $id }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateIngredient($input: CreateIngredientInput!) {\n    createIngredient(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateIngredient($input: CreateIngredientInput!) {\n    createIngredient(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateIngredient($input: UpdateIngredientInput!) {\n    updateIngredient(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateIngredient($input: UpdateIngredientInput!) {\n    updateIngredient(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecipes($query: String, $mealPlanOnly: Boolean) {\n    currentUser {\n      recipes(query: $query, mealPlanOnly: $mealPlanOnly) {\n        id\n        name\n        totalTime\n        imageUrl\n        mealPlanMultiplier\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecipes($query: String, $mealPlanOnly: Boolean) {\n    currentUser {\n      recipes(query: $query, mealPlanOnly: $mealPlanOnly) {\n        id\n        name\n        totalTime\n        imageUrl\n        mealPlanMultiplier\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      success\n      data {\n        id\n      }\n      errors {\n        message\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      success\n      data {\n        id\n      }\n      errors {\n        message\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearMealPlan {\n    clearMealPlan {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ClearMealPlan {\n    clearMealPlan {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Recipes($limit: Int) {\n    recipes(limit: $limit) {\n      nodes {\n        id\n        name\n        imageUrl\n        user {\n          fullName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Recipes($limit: Int) {\n    recipes(limit: $limit) {\n      nodes {\n        id\n        name\n        imageUrl\n        user {\n          fullName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Recipe($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      imageUrl\n      totalTime\n      instructions\n      ingredients {\n        id\n        name\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query Recipe($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      imageUrl\n      totalTime\n      instructions\n      ingredients {\n        id\n        name\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogIn($input: LogInUserInput!) {\n    logInUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LogIn($input: LogInUserInput!) {\n    logInUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: RegisterUserInput!) {\n    registerUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterUserInput!) {\n    registerUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;