import { backendRequest } from "~/api-client/client.server";
import { graphql } from "~/graphql-codegen";

const logInQuery = graphql(`
  mutation LogIn($input: LogInUserInput!) {
    logInUser(input: $input) {
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

export async function logIn(request: Request, email: string, password: string) {
  return backendRequest({
    token: "",
    document: logInQuery,
    variables: { input: { email, password } },
  });
}
