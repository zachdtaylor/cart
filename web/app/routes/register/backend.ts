import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";

const registerQuery = graphql(`
  mutation Register($input: RegisterUserInput!) {
    registerUser(input: $input) {
      success
      data {
        userId
        token
      }
      errors {
        path
        message
      }
    }
  }
`);

export function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  return backendRequest({
    document: registerQuery,
    variables: { input: { email, firstName, lastName, password } },
  });
}
