import { redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { backendRequest } from "../api-client/client.server";
import { getCurrentUserQuery } from "~/api-client/queries.server";

export async function getCurrentUser(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);

  const token = session.get("token");

  if (typeof token !== "string") {
    return null;
  }

  const response = await backendRequest(
    {
      document: getCurrentUserQuery,
      token,
    },
    {
      onUnauthorized: () => {
        console.log("unauthorized");
      },
    }
  );

  return { token, data: response?.currentUser };
}

export async function requireLoggedOutUser(request: Request) {
  const user = await getCurrentUser(request);

  if (user !== null) {
    throw redirect("/app");
  }
}

export async function requireLoggedInUser(request: Request) {
  const user = await getCurrentUser(request);

  if (user === null || typeof user === "undefined") {
    throw redirect("/login");
  }

  return user.token;
}

export async function getToken(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  return session.get("token");
}
