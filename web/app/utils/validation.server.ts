import { type z } from "zod";
import { type MutationError } from "~/graphql/graphql";
import { badRequest } from "./http.server";

type FieldErrors = { [key: string]: string };

type FormFields = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};

function objectify(formData: FormData) {
  const formFields: FormFields = {};

  formData.forEach((value, name) => {
    const isArrayField = name.endsWith("[]");
    const fieldName = isArrayField ? name.slice(0, -2) : name;

    if (!(fieldName in formFields)) {
      formFields[fieldName] = isArrayField ? formData.getAll(name) : value;
    }
  });

  return formFields;
}

export function validateForm<T>(
  formData: FormData,
  zodSchema: z.Schema<T>,
  successFn: (data: T) => unknown,
  errorFn?: (errors: FieldErrors) => unknown
) {
  const fields = objectify(formData);
  const result = zodSchema.safeParse(fields);
  if (!result.success) {
    const errors: FieldErrors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = issue.message;
    });
    return errorFn
      ? errorFn(errors)
      : badRequest({ errors, email: formData.get("email") });
  }
  return successFn(result.data);
}

export function formatMutationErrors(
  errors?: Array<MutationError | null> | null
) {
  return (
    errors?.reduce(
      (errors, error) => ({
        ...errors,
        [error?.path ?? "general"]: error?.message ?? "Unkown error",
      }),
      {} as FieldErrors
    ) ?? {}
  );
}
