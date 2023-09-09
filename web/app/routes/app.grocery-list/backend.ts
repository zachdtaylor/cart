import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";
import { getToken } from "~/utils/auth.server";

const getGroceryListItemsQuery = graphql(`
  query GroceryListItems {
    currentUser {
      groceryListItems {
        id
        name
        uses {
          id
          amount
          recipeName
          multiplier
        }
      }
    }
  }
`);

export async function getGroceryListItems(request: Request) {
  return backendRequest({
    token: await getToken(request),
    document: getGroceryListItemsQuery,
  });
}

const checkOffItemQuery = graphql(`
  mutation CheckOffItem($input: CheckOffGroceryListItemInput!) {
    checkOffGroceryListItem(input: $input) {
      success
      errors {
        message
        path
      }
    }
  }
`);

export async function checkOffItem(request: Request, itemName: string) {
  return backendRequest({
    token: await getToken(request),
    document: checkOffItemQuery,
    variables: { input: { itemName } },
  });
}
