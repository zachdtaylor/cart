import { json, redirect } from "@remix-run/node";
import { type GraphQLError } from "graphql";
import { request, ClientError, type Variables } from "graphql-request";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";

type ClientOptions = {
  onUnauthorized?: () => void;
  onNotFound?: () => void;
};

if (typeof process.env.BACKEND_URL !== "string") {
  throw new Error("Missing env: BACKEND_URL");
}

const apiUrl = process.env.BACKEND_URL;

const handleError = (error: GraphQLError, options?: ClientOptions) => {
  switch (error.extensions.code) {
    case "UNAUTHORIZED": {
      if (options?.onUnauthorized) {
        return options.onUnauthorized();
      } else {
        throw redirect("/login");
      }
    }
    case "NOT_FOUND": {
      if (options?.onNotFound) {
        return options.onNotFound();
      }
      throw json({ message: error.message }, { status: 404 });
    }
    default: {
      return;
    }
  }
};

type BackendRequestOpts<T, V> = {
  document: TypedDocumentNode<T, V>;
  token?: string;
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
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (error) {
    if (error instanceof ClientError) {
      error.response.errors?.forEach((error) => handleError(error, options));
      return error.response.data as Awaited<T>;
    }
  }
}
