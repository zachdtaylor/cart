import { data as remixData } from "react-router";

export function badRequest<T>(data: T) {
  return remixData(data, { status: 400 });
}
