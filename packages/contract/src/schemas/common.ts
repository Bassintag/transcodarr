import z from "zod";

export const idSchema = z.int();

export const idParamsSchema = z.object({
  id: z.coerce.number(),
});
