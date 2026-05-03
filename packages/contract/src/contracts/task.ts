import { oc } from "@orpc/contract";
import { taskSchema, updateTaskSchema } from "../schemas";

const update = oc
  .route({ method: "PATCH", path: "/{id}" })
  .input(updateTaskSchema)
  .output(taskSchema);

export const taskContract = oc.prefix("/tasks").router({ update });
