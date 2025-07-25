import { type ActionFunctionArgs, data, type LoaderFunctionArgs, redirect } from "react-router";
import {
  Form,
  isRouteErrorResponse,
  Link,
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useOutletContext,
  useRouteError,
} from "react-router";
import React from "react";
import { z } from "zod";
import {
  DeleteButton,
  ErrorMessage,
  Input,
  PrimaryButton,
} from "~/components/forms";
import {
  CalendarIcon,
  SaveIcon,
  TimeIcon,
  TrashIcon,
} from "~/components/icons";
import {
  classNames,
  useDebouncedFunction,
  useServerLayoutEffect,
} from "~/utils/misc";
import { validateForm } from "~/utils/validation.server";
import * as backend from "./backend";
import invariant from "tiny-invariant";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const result = await backend.getRecipe(request, String(params.recipeId));

  invariant(result?.currentUser?.recipe);

  return data(
    { recipe: result.currentUser.recipe },
    { headers: { "Cache-Control": "max-age=10" } }
  );
}

const saveNameSchema = z.object({
  name: z.string().min(1, "Name cannot be blank"),
});

const saveTotalTimeSchema = z.object({
  totalTime: z.string().min(1, "Total time cannot be blank"),
});

const saveInstructionsSchema = z.object({
  instructions: z.string().min(1, "Instructions cannot be blank"),
});

const ingredientId = z.string().min(1, "Ingredient ID is missing");

const ingredientAmount = z.string().nullable();

const ingredientName = z.string().min(1, "Name cannot be blank");

const saveIngredientAmountSchema = z.object({
  amount: ingredientAmount,
  id: ingredientId,
});

const saveIngredientNameSchema = z.object({
  name: ingredientName,
  id: ingredientId,
});

const saveRecipeSchema = z
  .object({
    imageUrl: z.string().optional(),
    ingredientIds: z.array(ingredientId).optional(),
    ingredientAmounts: z.array(ingredientAmount).optional(),
    ingredientNames: z.array(ingredientName).optional(),
  })
  .and(saveNameSchema)
  .and(saveTotalTimeSchema)
  .and(saveInstructionsSchema)
  .refine(
    (data) =>
      data.ingredientIds?.length === data.ingredientAmounts?.length &&
      data.ingredientIds?.length === data.ingredientNames?.length,
    { message: "Ingredient arrays must all be the same length" }
  );

const createIngredientSchema = z.object({
  newIngredientAmount: z.string().nullable(),
  newIngredientName: z.string().min(1, "Name cannot be blank"),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const recipeId = String(params.recipeId);
  const formData = await request.formData();
  const _action = formData.get("_action");

  if (typeof _action === "string" && _action.includes("deleteIngredient")) {
    const ingredientId = _action.split(".")[1];
    return backend.deleteIngredient(request, ingredientId);
  }

  switch (_action) {
    case "saveRecipe": {
      return validateForm(
        formData,
        saveRecipeSchema,
        ({ ingredientIds, ingredientNames, ingredientAmounts, ...data }) =>
          backend.saveRecipe(request, {
            ...data,
            id: recipeId,
            ingredients: ingredientIds?.map((id, index) => ({
              id,
              amount: ingredientAmounts?.[index],
              name: ingredientNames?.[index],
            })),
          }),

        (errors) => data({ errors }, { status: 400 })
      );
    }
    case "createIngredient": {
      return validateForm(
        formData,
        createIngredientSchema,
        ({ newIngredientAmount, newIngredientName }) =>
          backend.createIngredient(request, {
            recipeId,
            name: newIngredientName,
            amount: newIngredientAmount,
          }),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    case "deleteRecipe": {
      await backend.deleteRecipe(request, recipeId);
      return redirect("/app/recipes");
    }
    case "saveName": {
      return validateForm(
        formData,
        saveNameSchema,
        (data) => backend.saveName(request, recipeId, data.name),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    case "saveTotalTime": {
      return validateForm(
        formData,
        saveTotalTimeSchema,
        (data) => backend.saveTotalTime(request, recipeId, data.totalTime),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    case "saveInstructions": {
      return validateForm(
        formData,
        saveInstructionsSchema,
        (data) =>
          backend.saveInstructions(request, recipeId, data.instructions),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    case "saveIngredientAmount": {
      return validateForm(
        formData,
        saveIngredientAmountSchema,
        ({ id, amount }) => backend.saveIngredientAmount(request, id, amount),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    case "saveIngredientName": {
      return validateForm(
        formData,
        saveIngredientNameSchema,
        ({ id, name }) => backend.saveIngredientName(request, id, name),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    default: {
      return null;
    }
  }
}

export function useRecipeContext() {
  return useOutletContext<{
    recipeName?: string;
    mealPlanMultiplier?: number | null;
  }>();
}

export default function RecipeDetail() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const saveNameFetcher = useFetcher();
  const saveTotalTimeFetcher = useFetcher();
  const saveInstructionsFetcher = useFetcher();
  const createIngredientFetcher = useFetcher();
  const newIngredientAmountRef = React.useRef<HTMLInputElement>(null);

  const { renderedIngredients, addIngredient } = useOptimisticIngredients(
    data.recipe.ingredients,
    createIngredientFetcher.state
  );

  const [createIngredientForm, setCreateIngredientForm] = React.useState({
    amount: "",
    name: "",
  });

  const saveName = useDebouncedFunction(
    (name: string) =>
      saveNameFetcher.submit(
        {
          _action: "saveName",
          name,
        },
        { method: "post" }
      ),
    1000
  );

  const saveTotalTime = useDebouncedFunction(
    (totalTime: string) =>
      saveTotalTimeFetcher.submit(
        {
          _action: "saveTotalTime",
          totalTime,
        },
        { method: "post" }
      ),
    1000
  );

  const saveInstructions = useDebouncedFunction(
    (instructions: string) =>
      saveInstructionsFetcher.submit(
        {
          _action: "saveInstructions",
          instructions,
        },
        { method: "post" }
      ),
    1000
  );

  const createIngredient = () => {
    addIngredient(createIngredientForm.amount, createIngredientForm.name);
    createIngredientFetcher.submit(
      {
        _action: "createIngredient",
        newIngredientAmount: createIngredientForm.amount,
        newIngredientName: createIngredientForm.name,
      },
      { method: "post" }
    );
    setCreateIngredientForm({ amount: "", name: "" });
    newIngredientAmountRef.current?.focus();
  };

  return (
    <>
      <Outlet
        context={{
          recipeName: data.recipe?.name,
          mealPlanMultiplier: data.recipe?.mealPlanMultiplier,
        }}
      />
      <Form method="post" encType="multipart/form-data" reloadDocument>
        <button name="_action" value="saveRecipe" className="hidden" />
        <div className="flex mb-2">
          <Link
            to="update-meal-plan"
            className={classNames(
              "flex flex-col justify-center",
              data.recipe?.mealPlanMultiplier !== null ? "text-primary" : ""
            )}
          >
            <CalendarIcon />
          </Link>
          <div className="ml-2 flex-grow">
            <Input
              key={data.recipe?.id}
              type="text"
              placeholder="Recipe Name"
              autoComplete="off"
              className="text-2xl font-extrabold"
              name="name"
              defaultValue={data.recipe?.name}
              error={
                !!(
                  (saveNameFetcher?.data?.errors ?? {})?.name ||
                  (actionData?.errors ?? {})?.name
                )
              }
              onChange={(e) => saveName(e.target.value)}
            />
            <ErrorMessage>
              {(saveNameFetcher?.data?.errors ?? {})?.name ||
                (actionData?.errors ?? {})?.name}
            </ErrorMessage>
          </div>
        </div>
        <div className="flex">
          <TimeIcon />
          <div className="ml-2 flex-grow">
            <Input
              key={data.recipe?.id}
              type="text"
              placeholder="Time"
              autoComplete="off"
              name="totalTime"
              defaultValue={data.recipe?.totalTime ?? ""}
              error={
                !!(
                  (saveTotalTimeFetcher?.data?.errors ?? {})?.totalTime ||
                  (actionData?.errors ?? {})?.totalTime
                )
              }
              onChange={(e) => saveTotalTime(e.target.value)}
            />
            <ErrorMessage>
              {(saveTotalTimeFetcher?.data?.errors ?? {})?.totalTime ||
                (actionData?.errors ?? {})?.totalTime}
            </ErrorMessage>
          </div>
        </div>
        <div className="grid grid-cols-[30%_auto_min-content] my-4 gap-2">
          <h2 className="font-bold text-sm pb-1">Amount</h2>
          <h2 className="font-bold text-sm pb-1">Name</h2>
          <div></div>
          {renderedIngredients.map((ingredient, idx) => (
            <IngredientRow
              key={ingredient.id}
              id={ingredient.id}
              amount={ingredient.amount}
              name={ingredient.name}
              amountError={actionData?.errors?.[`ingredientAmounts.${idx}`]}
              nameError={(actionData?.errors ?? {})?.[`ingredientNames.${idx}`]}
              isOptimistic={ingredient.isOptimistic}
            />
          ))}
          <div>
            <Input
              ref={newIngredientAmountRef}
              type="text"
              autoComplete="off"
              name="newIngredientAmount"
              className="border-b-gray-200"
              error={
                !!(
                  (createIngredientFetcher.data?.errors ?? {})
                    ?.newIngredientAmount ??
                  (actionData?.errors ?? {})?.newIngredientAmount
                )
              }
              value={createIngredientForm.amount}
              onChange={(e) =>
                setCreateIngredientForm((values) => ({
                  ...values,
                  amount: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createIngredient();
                }
              }}
            />
            <ErrorMessage>
              {(createIngredientFetcher.data?.errors ?? {})
                ?.newIngredientAmount ??
                (actionData?.errors ?? {})?.newIngredientAmount}
            </ErrorMessage>
          </div>
          <div>
            <Input
              type="text"
              autoComplete="off"
              name="newIngredientName"
              className="border-b-gray-200"
              error={
                !!(
                  (createIngredientFetcher.data?.errors ?? {})
                    ?.newIngredientName ??
                  (actionData?.errors ?? {})?.newIngredientName
                )
              }
              value={createIngredientForm.name}
              onChange={(e) =>
                setCreateIngredientForm((values) => ({
                  ...values,
                  name: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createIngredient();
                }
              }}
            />
            <ErrorMessage>
              {(createIngredientFetcher.data?.errors ?? {})
                ?.newIngredientName ??
                (actionData?.errors ?? {})?.newIngredientName}
            </ErrorMessage>
          </div>
          <button
            name="_action"
            value="createIngredient"
            onClick={(e) => {
              e.preventDefault();
              createIngredient();
            }}
          >
            <SaveIcon />
          </button>
        </div>
        <label
          htmlFor="instructions"
          className="block font-bold text-sm pb-2 w-fit"
        >
          Instructions
        </label>
        <textarea
          key={data.recipe?.id}
          id="instructions"
          name="instructions"
          placeholder="Instructions go here"
          defaultValue={data.recipe?.instructions ?? ""}
          className={classNames(
            "w-full h-56 rounded-md outline-none",
            "focus:border-2 focus:p-3 focus:border-primary duration-300",
            saveInstructionsFetcher?.data?.errors?.instructions ||
              actionData?.errors?.instructions
              ? "border-2 border-red-500 p-3"
              : ""
          )}
          onChange={(e) => saveInstructions(e.target.value)}
        />
        <ErrorMessage>
          {saveInstructionsFetcher?.data?.errors?.instructions ||
            actionData?.errors?.instructions}
        </ErrorMessage>
        <label
          htmlFor="imageUrl"
          className="block font-bold text-sm pb-2 w-fit mt-4"
        >
          Image URL
        </label>
        <Input
          id="imageUrl"
          type="text"
          name="imageUrl"
          defaultValue={data.recipe?.imageUrl ?? ""}
          key={`${data.recipe?.id}.imageUrl`}
        />
        <hr className="my-4" />
        <div className="flex justify-between">
          <DeleteButton name="_action" value="deleteRecipe">
            Delete this Recipe
          </DeleteButton>
          <PrimaryButton name="_action" value="saveRecipe">
            <div className="flex flex-col justify-center h-full">Save</div>
          </PrimaryButton>
        </div>
      </Form>
    </>
  );
}

type IngredientRowProps = {
  id: string;
  amount?: string | null;
  amountError?: string;
  name: string;
  nameError?: string;
  isOptimistic?: boolean;
};
function IngredientRow({
  id,
  amount,
  amountError,
  name,
  nameError,
  isOptimistic,
}: IngredientRowProps) {
  const saveAmountFetcher = useFetcher();
  const saveNameFetcher = useFetcher();
  const deleteIngredientFetcher = useFetcher();

  const saveAmount = useDebouncedFunction(
    (amount: string) =>
      saveAmountFetcher.submit(
        {
          _action: "saveIngredientAmount",
          amount,
          id,
        },
        { method: "post" }
      ),
    1000
  );

  const saveName = useDebouncedFunction(
    (name: string) =>
      saveNameFetcher.submit(
        {
          _action: "saveIngredientName",
          name,
          id,
        },
        { method: "post" }
      ),
    1000
  );

  return deleteIngredientFetcher.state !== "idle" ? null : (
    <React.Fragment>
      <input type="hidden" name="ingredientIds[]" value={id} />
      <div>
        <Input
          type="text"
          autoComplete="off"
          name="ingredientAmounts[]"
          defaultValue={amount ?? ""}
          error={!!(saveAmountFetcher.data?.errors?.amount ?? amountError)}
          onChange={(e) => saveAmount(e.target.value)}
          disabled={isOptimistic}
        />
        <ErrorMessage>
          {saveAmountFetcher.data?.errors?.amount ?? amountError}
        </ErrorMessage>
      </div>
      <div>
        <Input
          type="text"
          autoComplete="off"
          name="ingredientNames[]"
          defaultValue={name}
          error={!!(saveNameFetcher.data?.errors?.name ?? nameError)}
          onChange={(e) => saveName(e.target.value)}
          disabled={isOptimistic}
        />
        <ErrorMessage>
          {saveNameFetcher.data?.errors?.name ?? nameError}
        </ErrorMessage>
      </div>
      <button
        name="_action"
        value={`deleteIngredient.${id}`}
        onClick={(e) => {
          e.preventDefault();
          deleteIngredientFetcher.submit(
            {
              _action: `deleteIngredient.${id}`,
            },
            { method: "post" }
          );
        }}
      >
        <TrashIcon />
      </button>
    </React.Fragment>
  );
}

type RenderedIngredient = {
  id: string;
  name: string;
  amount?: string | null;
  isOptimistic?: boolean;
};
function useOptimisticIngredients(
  savedIngredients: Array<RenderedIngredient>,
  createIngredientState: "idle" | "submitting" | "loading"
) {
  const [optimisticIngredients, setOptimisticIngredients] = React.useState<
    Array<RenderedIngredient>
  >([]);

  const renderedIngredients = [...savedIngredients, ...optimisticIngredients];

  useServerLayoutEffect(() => {
    if (createIngredientState === "idle") {
      setOptimisticIngredients([]);
    }
  }, [createIngredientState]);

  const addIngredient = (amount: string | null, name: string) => {
    setOptimisticIngredients((ingredients) => [
      ...ingredients,
      { id: createItemId(), name, amount, isOptimistic: true },
    ]);
  };

  return { renderedIngredients, addIngredient };
}

function createItemId() {
  return `${Math.round(Math.random() * 1_000_000)}`;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="bg-red-600 text-white rounded-md p-4">
        <h1 className="mb-2">
          {error.status} {error.statusText ? `- ${error.statusText}` : ""}
        </h1>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-red-600 text-white rounded-md p-4">
      An unknown error occurred.
    </div>
  );
}
