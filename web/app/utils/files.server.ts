import { unstable_createFileUploadHandler } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";

export async function storeFile(request: Request, inputName: string) {
  let formData;
  if (request.headers.get("Content-Type")?.includes("multipart/form-data")) {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({ directory: "public/images" }),
      unstable_createMemoryUploadHandler()
    );
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const image = formData.get(inputName) as File;
    if (image.size !== 0) {
      formData.set("imageUrl", `/images/${image.name}`);
    }
  } else {
    formData = await request.formData();
  }

  return formData;
}
