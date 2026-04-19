import z from "zod";

export const createJobSchema = z.object({
  type: z.enum(["sync-radarr", "sync-sonarr"]),
});

export type CreateJob = z.infer<typeof createJobSchema>;
