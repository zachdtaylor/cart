import { type ActionArgs, type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  DiscoverRecipeDetails,
  DiscoverRecipeHeader,
} from "~/components/discover";
import * as backend from "./backend";
import invariant from "tiny-invariant";
import { PrimaryButton } from "~/components/forms";

export async function loader({ params, request }: LoaderArgs) {
  const result = await backend.getDiscoverDetailPageData(
    request,
    String(params.recipeId)
  );

  invariant(result?.recipe);

  const recipe = result.recipe;
  const user = result?.currentUser;

  return json({ recipe, user });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const recipeId = String(params.recipeId);

  switch (formData.get("_action")) {
    case "saveToRecipeBook": {
      return backend.saveToRecipeBook(request, recipeId);
    }
    default: {
      return null;
    }
  }
}

export default function DiscoverRecipe() {
  const data = useLoaderData<typeof loader>();
  const recipe = data.recipe;
  const user = data.user;

  return (
    <div className="md:h-[calc(100vh-1rem)] m-[-1rem] overflow-auto">
      <DiscoverRecipeHeader recipe={data.recipe} />
      <form method="post" className="pt-4 pl-4 pr-4 md:float-right">
        {user &&
        recipe.user.id === user.id ? null : recipe.copiedByCurrentUser ? (
          <PrimaryButton className="w-full" disabled>
            ✓ Saved to my Recipe Book
          </PrimaryButton>
        ) : user ? (
          <PrimaryButton
            className="w-full"
            name="_action"
            value="saveToRecipeBook"
          >
            Save to my Recipe Book
          </PrimaryButton>
        ) : null}
      </form>
      <DiscoverRecipeDetails recipe={data.recipe} />
    </div>
  );
}
