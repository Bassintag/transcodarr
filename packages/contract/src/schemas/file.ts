import { z } from "zod";
import { idSchema } from "./common";
import { mediaSchema } from "./media";

export const filesQuerySchema = z.object({
  mediaId: z.coerce.number().optional(),
});

export type FilesQuery = z.infer<typeof filesQuerySchema>;

export const fileSchema = z.object({
  id: idSchema,
  audioBitRate: z.int(),
  audioChannels: z.number(),
  audioCodec: z.string(),
  path: z.string(),
  resolution: z.string(),
  size: z.int(),
  videoBitDepth: z.int(),
  videoBitRate: z.int(),
  videoCodec: z.string(),
  videoFps: z.number(),
  valid: z.boolean(),
  media: mediaSchema,
});

export type File = z.infer<typeof fileSchema>;
