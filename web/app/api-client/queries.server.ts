import { graphql } from "../graphql-codegen/gql";

export const getAllShelvesQuery = graphql(`
  query GetAllShelves($query: String) {
    currentUser {
      pantryShelves(query: $query) {
        id
        name
        items {
          id
          name
        }
      }
    }
  }
`);

export const createShelfQuery = graphql(`
  mutation CreateShelf($input: CreatePantryShelfInput!) {
    createPantryShelf(input: $input) {
      success
      errors {
        message
        path
      }
    }
  }
`);

export const deleteShelfQuery = graphql(`
  mutation DeleteShelf($input: DeletePantryShelfInput!) {
    deletePantryShelf(input: $input) {
      success
      errors {
        message
        path
      }
    }
  }
`);

export const updateShelfNameQuery = graphql(`
  mutation UpdateShelfName($input: UpdatePantryShelfNameInput!) {
    updatePantryShelfName(input: $input) {
      success
      errors {
        message
        path
      }
    }
  }
`);

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    currentUser {
      id
      firstName
      lastName
      email
    }
  }
`);

export const createPantryItemQuery = graphql(`
  mutation CreatePantryItem($input: CreatePantryItemInput!) {
    createPantryItem(input: $input) {
      success
      errors {
        message
        path
      }
    }
  }
`);

export const deletePantryItemQuery = graphql(`
  mutation DeletePantryItem($input: DeletePantryItemInput!) {
    deletePantryItem(input: $input) {
      success
      errors {
        message
        path
      }
    }
  }
`);
