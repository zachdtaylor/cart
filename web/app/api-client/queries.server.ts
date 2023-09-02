import { graphql } from "../graphql-codegen/gql";

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
