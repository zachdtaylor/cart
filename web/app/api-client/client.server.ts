import { redirect } from "@remix-run/node";
import { type GraphQLError } from "graphql";
import {
  request,
  ClientError,
  GraphQLClient,
  type ResponseMiddleware,
  type Variables,
} from "graphql-request";
import { getSession } from "~/sessions";
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

function getResponseMiddleware(options?: ClientOptions) {
  const responseMiddleware: ResponseMiddleware = (response) => {
    if (response instanceof ClientError) {
      response.response.errors?.forEach((error) => handleError(error, options));
    }
  };
  return responseMiddleware;
}

export async function getClient(webRequest: Request, options?: ClientOptions) {
  const cookieHeader = webRequest.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const token = session.get("token");

  const graphqlClient = new GraphQLClient(apiUrl, {
    responseMiddleware: getResponseMiddleware(options),
  });

  if (typeof token === "string") {
    graphqlClient.setHeader("authorization", `Bearer ${token}`);
  }

  return graphqlClient;
}

type BackendRequestOpts<T, V> = {
  document: TypedDocumentNode<T, V>;
  token: string;
  variables?: V;
};
export async function backendRequest<
  T,
  V extends Variables | undefined = Variables
>({ document, token, variables }: BackendRequestOpts<T, V>) {
  return request({
    url: apiUrl,
    document,
    variables,
    requestHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
}
