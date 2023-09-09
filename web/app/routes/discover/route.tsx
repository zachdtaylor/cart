import { useLoaderData } from "@remix-run/react";
import { DiscoverGrid, DiscoverListItem } from "~/components/discover";
import * as backend from "./backend";
import invariant from "tiny-invariant";

export async function loader() {
  const result = await backend.getRecipes();

  invariant(result?.recipes?.nodes);

  return { recipes: result.recipes.nodes };
}

export default function Discover() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="h-[calc(100vh-1rem)] p-4 m-[-1rem] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Discover</h1>
      <DiscoverGrid>
        {data.recipes.map((recipe) => (
          <DiscoverListItem key={recipe.id} recipe={recipe} />
        ))}
      </DiscoverGrid>
    </div>
  );
}
