import z from "zod";
import { idSchema } from "./common";

export const createSyncRadarrJobSchema = z.object({
  type: z.literal("sync-radarr"),
});

export type CreateSyncRadarrJob = z.infer<typeof createSyncRadarrJobSchema>;

export const createSyncSonarrJobSchema = z.object({
  type: z.literal("sync-sonarr"),
});

export type CreateSyncSonarrJob = z.infer<typeof createSyncSonarrJobSchema>;

export const createTranscodeFileJobSchema = z.object({
  type: z.literal("transcode-file"),
  fileId: idSchema,
});

export type CreateTranscodeFileJob = z.infer<
  typeof createTranscodeFileJobSchema
>;

export const createJobSchema = z.discriminatedUnion("type", [
  createSyncRadarrJobSchema,
  createSyncSonarrJobSchema,
  createTranscodeFileJobSchema,
]);

export type CreateJob = z.infer<typeof createJobSchema>;
