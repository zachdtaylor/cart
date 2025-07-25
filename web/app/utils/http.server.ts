import { data as remixData } from "@remix-run/node";

export function badRequest<T>(data: T) {
  return remixData(data, { status: 400 });
}
