import z from "zod";
import { oc } from "../oc";
import { createJobSchema } from "../schemas";

const create = oc
  .route({ path: "/", method: "POST" })
  .input(z.object({ body: createJobSchema }));

export const jobContract = oc.prefix("/jobs").router({ create });
