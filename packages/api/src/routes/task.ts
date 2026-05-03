import { oc } from "#/lib/oc";
import { taskService } from "#/services/task";

const update = oc.task.update.handler(async function ({ input }) {
  return taskService.update(input);
});

export const taskRoutes = { update };
