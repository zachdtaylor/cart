import {
  type ActionFunctionArgs,
  data,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { type GroceryListItem as GroceryListItemType } from "~/graphql-codegen/graphql";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { CheckCircleIcon } from "~/components/icons";
import { validateForm } from "~/utils/validation.server";
import * as backend from "./backend";
import invariant from "tiny-invariant";

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await backend.getGroceryListItems(request);

  invariant(result?.currentUser?.groceryListItems);

  return { groceryList: result.currentUser.groceryListItems };
}

const checkOffItemSchema = z.object({
  name: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  switch (formData.get("_action")) {
    case "checkOffItem": {
      return validateForm(
        formData,
        checkOffItemSchema,
        ({ name }) => backend.checkOffItem(request, name),
        (errors) => data({ errors }, { status: 400 })
      );
    }
    default: {
      return null;
    }
  }
}

function GroceryListItem({ item }: { item: GroceryListItemType }) {
  const fetcher = useFetcher();

  return fetcher.state !== "idle" ? null : (
    <div className="shadow-md rounded-md p-4 flex">
      <div className="flex-grow">
        <h1 className="text-sm font-bold mb-2 uppercase">{item.name}</h1>
        <ul>
          {item.uses.map((use) => (
            <li key={use.id} className="py-1">
              {use.amount} for {use.recipeName} (x{use.multiplier})
            </li>
          ))}
        </ul>
      </div>
      <fetcher.Form method="post" className="flex flex-col justify-center">
        <input type="hidden" name="name" value={item.name} />
        <button
          name="_action"
          value="checkOffItem"
          className="hover:text-primary"
        >
          <CheckCircleIcon />
        </button>
      </fetcher.Form>
    </div>
  );
}

export default function GroceryList() {
  const data = useLoaderData<typeof loader>();
  return data.groceryList.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data.groceryList.map((item) => (
        <GroceryListItem key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <div className="w-fit m-auto text-center py-16">
      <h1 className="text-3xl">All set!</h1>
      <div className="text-primary flex justify-center py-4">
        <CheckCircleIcon large />
      </div>
      <p>You have everything you need</p>
    </div>
  );
}
