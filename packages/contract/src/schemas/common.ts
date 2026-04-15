import z from "zod";

export const idSchema = z.int();

export const withIdSchema = z.object({
  id: idSchema,
});
