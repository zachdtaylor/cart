/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthInfo = {
  __typename?: 'AuthInfo';
  token: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CreatePantryItemInput = {
  name: Scalars['String']['input'];
  shelfId: Scalars['ID']['input'];
};

export type CreatePantryItemResponse = {
  __typename?: 'CreatePantryItemResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<PantryItem>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type CreatePantryShelfInput = {
  name: Scalars['String']['input'];
};

export type CreatePantryShelfResponse = {
  __typename?: 'CreatePantryShelfResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<PantryShelf>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type DeletePantryItemInput = {
  itemId: Scalars['ID']['input'];
};

export type DeletePantryItemResponse = {
  __typename?: 'DeletePantryItemResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<PantryItem>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type DeletePantryShelfInput = {
  shelfId: Scalars['ID']['input'];
};

export type DeletePantryShelfResponse = {
  __typename?: 'DeletePantryShelfResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<PantryShelf>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type LogInUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogInUserResponse = {
  __typename?: 'LogInUserResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<AuthInfo>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type MutationError = {
  __typename?: 'MutationError';
  message?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type PantryItem = {
  __typename?: 'PantryItem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shelfId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type PantryShelf = {
  __typename?: 'PantryShelf';
  id: Scalars['ID']['output'];
  items: Array<PantryItem>;
  name: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<AuthInfo>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Create a new pantry item */
  createPantryItem?: Maybe<CreatePantryItemResponse>;
  /** Create a new pantry shelf */
  createPantryShelf?: Maybe<CreatePantryShelfResponse>;
  /** Delete a pantry item */
  deletePantryItem?: Maybe<DeletePantryItemResponse>;
  /** Delete a pantry shelf */
  deletePantryShelf?: Maybe<DeletePantryShelfResponse>;
  /** Log in an existing user */
  logInUser?: Maybe<LogInUserResponse>;
  /** Register a new user */
  registerUser?: Maybe<RegisterUserResponse>;
  /** Update the name of a pantry shelf */
  updatePantryShelfName?: Maybe<UpdatePantryShelfNameResponse>;
};


export type RootMutationTypeCreatePantryItemArgs = {
  input: CreatePantryItemInput;
};


export type RootMutationTypeCreatePantryShelfArgs = {
  input: CreatePantryShelfInput;
};


export type RootMutationTypeDeletePantryItemArgs = {
  input: DeletePantryItemInput;
};


export type RootMutationTypeDeletePantryShelfArgs = {
  input: DeletePantryShelfInput;
};


export type RootMutationTypeLogInUserArgs = {
  input: LogInUserInput;
};


export type RootMutationTypeRegisterUserArgs = {
  input: RegisterUserInput;
};


export type RootMutationTypeUpdatePantryShelfNameArgs = {
  input: UpdatePantryShelfNameInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  currentUser?: Maybe<User>;
};

export type UpdatePantryShelfNameInput = {
  name: Scalars['String']['input'];
  shelfId: Scalars['ID']['input'];
};

export type UpdatePantryShelfNameResponse = {
  __typename?: 'UpdatePantryShelfNameResponse';
  /** The object modified by the mutation. May be null if mutation failed. */
  data?: Maybe<PantryShelf>;
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  errors: Array<Maybe<MutationError>>;
  /** Indicates if the mutation completed successfully or not. */
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  pantryShelves: Array<PantryShelf>;
};


export type UserPantryShelvesArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllShelvesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllShelvesQuery = { __typename?: 'RootQueryType', currentUser?: { __typename?: 'User', pantryShelves: Array<{ __typename?: 'PantryShelf', id: string, name: string, items: Array<{ __typename?: 'PantryItem', id: string, name: string }> }> } | null };

export type CreateShelfMutationVariables = Exact<{
  input: CreatePantryShelfInput;
}>;


export type CreateShelfMutation = { __typename?: 'RootMutationType', createPantryShelf?: { __typename?: 'CreatePantryShelfResponse', success: boolean, errors: Array<{ __typename?: 'MutationError', message?: string | null, path?: string | null } | null> } | null };

export type DeleteShelfMutationVariables = Exact<{
  input: DeletePantryShelfInput;
}>;


export type DeleteShelfMutation = { __typename?: 'RootMutationType', deletePantryShelf?: { __typename?: 'DeletePantryShelfResponse', success: boolean, errors: Array<{ __typename?: 'MutationError', message?: string | null, path?: string | null } | null> } | null };

export type UpdateShelfNameMutationVariables = Exact<{
  input: UpdatePantryShelfNameInput;
}>;


export type UpdateShelfNameMutation = { __typename?: 'RootMutationType', updatePantryShelfName?: { __typename?: 'UpdatePantryShelfNameResponse', success: boolean, errors: Array<{ __typename?: 'MutationError', message?: string | null, path?: string | null } | null> } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'RootQueryType', currentUser?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null };

export type CreatePantryItemMutationVariables = Exact<{
  input: CreatePantryItemInput;
}>;


export type CreatePantryItemMutation = { __typename?: 'RootMutationType', createPantryItem?: { __typename?: 'CreatePantryItemResponse', success: boolean, errors: Array<{ __typename?: 'MutationError', message?: string | null, path?: string | null } | null> } | null };

export type DeletePantryItemMutationVariables = Exact<{
  input: DeletePantryItemInput;
}>;


export type DeletePantryItemMutation = { __typename?: 'RootMutationType', deletePantryItem?: { __typename?: 'DeletePantryItemResponse', success: boolean, errors: Array<{ __typename?: 'MutationError', message?: string | null, path?: string | null } | null> } | null };

export type LogInMutationVariables = Exact<{
  input: LogInUserInput;
}>;


export type LogInMutation = { __typename?: 'RootMutationType', logInUser?: { __typename?: 'LogInUserResponse', success: boolean, data?: { __typename?: 'AuthInfo', userId: string, token: string } | null, errors: Array<{ __typename?: 'MutationError', path?: string | null, message?: string | null } | null> } | null };


export const GetAllShelvesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllShelves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pantryShelves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllShelvesQuery, GetAllShelvesQueryVariables>;
export const CreateShelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePantryShelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPantryShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<CreateShelfMutation, CreateShelfMutationVariables>;
export const DeleteShelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePantryShelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePantryShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteShelfMutation, DeleteShelfMutationVariables>;
export const UpdateShelfNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelfName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePantryShelfNameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePantryShelfName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateShelfNameMutation, UpdateShelfNameMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreatePantryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePantryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePantryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPantryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePantryItemMutation, CreatePantryItemMutationVariables>;
export const DeletePantryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePantryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePantryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePantryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<DeletePantryItemMutation, DeletePantryItemMutationVariables>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logInUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;