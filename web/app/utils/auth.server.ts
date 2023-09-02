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

  const { currentUser } = await backendRequest({
    document: getCurrentUserQuery,
    token,
  });

  return { token, data: currentUser };
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
