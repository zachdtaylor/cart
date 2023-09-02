import { redirect } from "@remix-run/node";
import { type GraphQLError } from "graphql";
import { request, ClientError, type Variables } from "graphql-request";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";

type ClientOptions = {
  onUnauthorized?: () => void;
};

const apiUrl = "http://127.0.0.1:4000/api/graphiql";

const handleError = (error: GraphQLError, options?: ClientOptions) => {
  switch (error.extensions.code) {
    case "UNAUTHORIZED": {
      if (options?.onUnauthorized) {
        options.onUnauthorized();
      } else {
        throw redirect("/login");
      }
    }
    default: {
      return;
    }
  }
};

type BackendRequestOpts<T, V> = {
  document: TypedDocumentNode<T, V>;
  token: string;
  variables?: V;
};
export async function backendRequest<
  T,
  V extends Variables | undefined = Variables
>(
  { document, token, variables }: BackendRequestOpts<T, V>,
  options?: ClientOptions
) {
  try {
    const result = await request({
      url: apiUrl,
      document,
      variables,
      requestHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof ClientError) {
      error.response.errors?.forEach((error) => handleError(error, options));
    }
  }
}
