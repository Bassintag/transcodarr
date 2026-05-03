import { fileSchema, filesQuerySchema } from "../schemas";
import z from "zod";
import { idParamsSchema } from "../schemas/common";
import { oc } from "@orpc/contract";

const list = oc
  .route({ path: "/", method: "GET" })
  .input(filesQuerySchema)
  .output(z.array(fileSchema));

const get = oc
  .route({ path: "/{id}", method: "GET" })
  .input(idParamsSchema)
  .output(fileSchema);

const getContent = oc
  .route({ path: "/{id}/content", method: "GET" })
  .input(idParamsSchema)
  .output(z.unknown());

export const fileContract = oc
  .prefix("/files")
  .router({ list, get, getContent });
