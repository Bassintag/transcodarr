import { oc } from "@orpc/contract";
import { fileSchema } from "../schemas";
import z from "zod";
import { withIdSchema } from "../schemas/common";

export const fileContract = {
  list: oc.output(z.array(fileSchema)),
  get: oc.input(withIdSchema).output(fileSchema),
};
