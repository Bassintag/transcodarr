import z from "zod";
import { idSchema } from "./common";

export const imageSchema = z.object({
  id: idSchema,
  type: z.enum(["poster", "fanart"]),
  url: z.string(),
});

export type Image = z.infer<typeof imageSchema>;
