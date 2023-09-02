import db from "~/db.server";
import { handleDelete } from "./utils";
import { graphql } from "~/graphql";

export async function getAllShelves(token: string) {
  const { currentUser } = await client.request(getAllShelvesQuery);
  console.log("currentUser", currentUser);

  return currentUser?.pantryShelves;
}

export function createShelf(userId: string) {
  return db.pantryShelf.create({
    data: {
      userId,
      name: "New Shelf",
    },
  });
}

export function deleteShelf(id: string) {
  return handleDelete(() => db.pantryShelf.delete({ where: { id } }));
}

export function saveShelfName(shelfId: string, shelfName: string) {
  return db.pantryShelf.update({
    where: {
      id: shelfId,
    },
    data: {
      name: shelfName,
    },
  });
}

export function getShelf(id: string) {
  return db.pantryShelf.findUnique({ where: { id } });
}
