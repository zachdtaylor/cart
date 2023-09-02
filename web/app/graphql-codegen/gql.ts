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
    "\n  query GetAllShelves($query: String) {\n    currentUser {\n      pantryShelves(query: $query) {\n        id\n        name\n        items {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetAllShelvesDocument,
    "\n  mutation CreateShelf($input: CreatePantryShelfInput!) {\n    createPantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.CreateShelfDocument,
    "\n  mutation DeleteShelf($input: DeletePantryShelfInput!) {\n    deletePantryShelf(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.DeleteShelfDocument,
    "\n  mutation UpdateShelfName($input: UpdatePantryShelfNameInput!) {\n    updatePantryShelfName(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.UpdateShelfNameDocument,
    "\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  mutation CreatePantryItem($input: CreatePantryItemInput!) {\n    createPantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.CreatePantryItemDocument,
    "\n  mutation DeletePantryItem($input: DeletePantryItemInput!) {\n    deletePantryItem(input: $input) {\n      success\n      errors {\n        message\n        path\n      }\n    }\n  }\n": types.DeletePantryItemDocument,
    "\n  mutation LogIn($input: LogInUserInput!) {\n    logInUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n": types.LogInDocument,
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
export function graphql(source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation LogIn($input: LogInUserInput!) {\n    logInUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LogIn($input: LogInUserInput!) {\n    logInUser(input: $input) {\n      success\n      data {\n        userId\n        token\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;