import { z } from "zod";
import { idSchema } from "./common";
import { imageSchema } from "./image";

export const mediaSchema = z.object({
  id: idSchema,
  title: z.string(),
  provider: z.enum(["radarr", "sonarr"]),
  providerId: z.int(),
  images: z.array(imageSchema),
});

export type Media = z.infer<typeof mediaSchema>;
