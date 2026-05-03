import z from "zod";
import { idSchema } from "./common";

export const profileSchema = z.object({
  id: idSchema,
  audioBitRate: z.int().min(0),
  audioCodec: z.string().min(1).max(64),
  audioChannels: z.int().min(0),
  container: z.string().min(1).max(64),
  videoBitRate: z.int().min(0),
  videoCodec: z.string().min(1).max(64),
  videoResolution: z
    .string()
    .min(1)
    .max(32)
    .regex(/^\d+\/\d+$/),
});
