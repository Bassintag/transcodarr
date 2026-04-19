import { z } from "zod";
import { idSchema } from "./common";

export const filesQuerySchema = z.object({
  mediaId: z.coerce.number().optional(),
});

export type FilesQuery = z.infer<typeof filesQuerySchema>;

export const fileSchema = z.object({
  id: idSchema,
  path: z.string(),
});

export type File = z.infer<typeof fileSchema>;
