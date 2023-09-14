import { redirect, type ActionArgs } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { z } from "zod";
import { ErrorMessage, PrimaryButton, PrimaryInput } from "~/components/forms";
import { commitSession, getSession } from "~/sessions";
import { formatMutationErrors, validateForm } from "~/utils/validation.server";
import * as backend from "./backend";
import invariant from "tiny-invariant";
import { badRequest } from "~/utils/http.server";

const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string(),
});

export async function action({ request }: ActionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const formData = await request.formData();

  return validateForm(
    formData,
    registerSchema,
    async ({ email, firstName, lastName, password }) => {
      const result = await backend.register(
        email,
        firstName,
        lastName,
        password
      );

      if (result?.registerUser?.success) {
        invariant(result.registerUser.data?.token);
        session.set("token", result.registerUser.data.token);

        return redirect("/", {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      }

      return badRequest({
        errors: formatMutationErrors(result?.registerUser?.errors),
        email,
        firstName,
        lastName,
      });
    }
  );
}

export default function Register() {
  const actionData = useActionData();
  return (
    <div className="text-center mt-36">
      <h1 className="text-3xl mb-8">Remix Recipes</h1>
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
            type="text"
            name="firstName"
            placeholder="First Name"
            autoComplete="off"
            defaultValue={actionData?.firstName}
          />
          <ErrorMessage>{actionData?.errors?.firstName}</ErrorMessage>
        </div>
        <div className="text-left pb-4">
          <PrimaryInput
            type="text"
            name="lastName"
            placeholder="Last Name"
            autoComplete="off"
            defaultValue={actionData?.lastName}
          />
          <ErrorMessage>{actionData?.errors?.lastName}</ErrorMessage>
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
        <PrimaryButton className="w-fit mx-auto">Create Account</PrimaryButton>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Log In
        </Link>
      </p>
    </div>
  );
}
