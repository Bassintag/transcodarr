import { oc } from "@orpc/contract";
import { createJobSchema } from "../schemas";

const create = oc.route({ path: "/", method: "POST" }).input(createJobSchema);

export const jobContract = oc.prefix("/jobs").router({ create });
