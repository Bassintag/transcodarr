import { oc } from "#/lib/oc";
import { jobService } from "#/services/job";

export const create = oc.job.create.handler(async ({ input }) => {
  await jobService.create(input.body);
});

export const jobRoutes = { create };
