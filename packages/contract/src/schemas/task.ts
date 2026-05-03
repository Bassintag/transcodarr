import z from "zod";
import { idParamsSchema, idSchema } from "./common";
import { fileSchema } from "./file";

export const taskSchema = z.object({
  id: idSchema,
  file: fileSchema,
  progress: z.int().min(0).max(100),
});

export type Task = z.infer<typeof taskSchema>;

export const updateTaskSchema = z.intersection(
  idParamsSchema,
  taskSchema.pick({ progress: true }).partial(),
);

export type UpdateTask = z.infer<typeof updateTaskSchema>;
