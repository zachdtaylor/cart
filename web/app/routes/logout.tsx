import { type LoaderFunctionArgs, data, redirect } from "react-router";
import { destroySession, getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);

  const url = new URL(request.url);

  const headers = {
    "Set-Cookie": await destroySession(session),
  };

  if (url.searchParams.get("headless") === "true") {
    return redirect("/login", { headers });
  }

  return data("ok", { headers });
}

export default function Logout() {
  return (
    <div className="text-center">
      <div className="mt-24">
        <h1 className="text-2xl">You're good to go!</h1>
        <p className="py-8">Logout successful</p>
        <a href="/" className="text-primary">
          Take me home
        </a>
      </div>
    </div>
  );
}
