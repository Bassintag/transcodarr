import { fileSchema, filesQuerySchema } from "../schemas";
import z from "zod";
import { idParamsSchema } from "../schemas/common";
import { oc } from "../oc";

const list = oc
  .route({ path: "/", method: "GET" })
  .input(z.object({ query: filesQuerySchema }))
  .output(z.array(fileSchema));

const get = oc
  .route({ path: "/{id}", method: "GET" })
  .input(z.object({ params: idParamsSchema }))
  .output(fileSchema);

export const fileContract = oc.prefix("/files").router({ list, get });
