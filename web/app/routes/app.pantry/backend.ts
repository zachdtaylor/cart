import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";
import { getToken } from "~/utils/auth.server";

const getAllShelvesQuery = graphql(`
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

export async function getAllShelves(request: Request, query: string | null) {
  return backendRequest({
    document: getAllShelvesQuery,
    token: await getToken(request),
    variables: { query },
  });
}

const createShelfQuery = graphql(`
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

export async function createShelf(request: Request) {
  return backendRequest({
    token: await getToken(request),
    document: createShelfQuery,
    variables: { input: { name: "New Shelf" } },
  });
}

const deleteShelfQuery = graphql(`
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

export async function deleteShelf(request: Request, shelfId: string) {
  return backendRequest({
    token: await getToken(request),
    document: deleteShelfQuery,
    variables: { input: { shelfId } },
  });
}

const updateShelfNameQuery = graphql(`
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

export async function saveShelfName(
  request: Request,
  shelfId: string,
  name: string
) {
  return backendRequest({
    token: await getToken(request),
    document: updateShelfNameQuery,
    variables: {
      input: { name, shelfId },
    },
  });
}

const createPantryItemQuery = graphql(`
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

export async function createShelfItem(
  request: Request,
  shelfId: string,
  name: string
) {
  return backendRequest({
    token: await getToken(request),
    document: createPantryItemQuery,
    variables: {
      input: { name, shelfId },
    },
  });
}

const deletePantryItemQuery = graphql(`
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

export async function deleteShelfItem(request: Request, itemId: string) {
  return backendRequest({
    token: await getToken(request),
    document: deletePantryItemQuery,
    variables: { input: { itemId } },
  });
}
