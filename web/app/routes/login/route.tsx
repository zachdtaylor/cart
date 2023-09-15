import { type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { z } from "zod";
import { ErrorMessage, PrimaryButton, PrimaryInput } from "~/components/forms";
import { commitSession, getSession } from "~/sessions";
import { formatMutationErrors, validateForm } from "~/utils/validation.server";
import { requireLoggedOutUser } from "~/utils/auth.server";
import { badRequest } from "~/utils/http.server";
import invariant from "tiny-invariant";
import * as backend from "./backend";

export async function loader({ request }: LoaderArgs) {
  await requireLoggedOutUser(request);
  return null;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function action({ request }: ActionArgs) {
  await requireLoggedOutUser(request);

  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const formData = await request.formData();

  return validateForm(formData, loginSchema, async ({ email, password }) => {
    const response = await backend.logIn(email, password);

    if (response?.logInUser?.success) {
      invariant(response.logInUser?.data?.token);
      session.set("token", response.logInUser.data.token);

      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    return badRequest({
      errors: formatMutationErrors(response?.logInUser?.errors),
      email,
    });
  });
}

export default function Login() {
  const actionData = useActionData();
  return (
    <div className="text-center mt-36">
      <h1 className="text-3xl mb-8">Cart</h1>
      <ErrorMessage>{actionData?.errors?.general}</ErrorMessage>
      <form method="post" className="mx-auto md:max-w-xs">
        <div className="text-left pb-4">
          <PrimaryInput
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            defaultValue={actionData?.email}
          />
          <ErrorMessage>{actionData?.errors?.email}</ErrorMessage>
        </div>
        <div className="text-left pb-4">
          <PrimaryInput
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
          />
          <ErrorMessage>{actionData?.errors?.password}</ErrorMessage>
        </div>

        <PrimaryButton className="w-1/3 mx-auto">Log In</PrimaryButton>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary">
          Create one here
        </Link>
      </p>
    </div>
  );
}
