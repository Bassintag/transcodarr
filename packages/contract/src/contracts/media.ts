import z from "zod";
import { mediaSchema } from "../schemas";
import { idParamsSchema } from "../schemas/common";
import { oc } from "../oc";

const list = oc
  .route({ path: "/", method: "GET" })
  .output(z.array(mediaSchema));

const get = oc
  .route({ path: "/{id}", method: "GET" })
  .input(z.object({ params: idParamsSchema }))
  .output(mediaSchema);

export const mediaContract = oc.prefix("/medias").router({ list, get });
