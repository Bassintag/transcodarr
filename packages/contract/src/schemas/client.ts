import z from "zod";
import { idSchema } from "./common";
import { taskSchema } from "./task";

export const clientSchema = z.object({
  id: idSchema,
  title: z.string().min(1).max(256),
  status: z.enum(["online", "offline"]),
});

export type Client = z.infer<typeof clientSchema>;

export const createClientSchema = clientSchema.pick({
  title: true,
});

export type SetClient = z.infer<typeof createClientSchema>;

export const clientTaskEventSchema = z.object({
  type: z.literal("task"),
  task: taskSchema,
});

export type ClientTaskEvent = z.infer<typeof clientTaskEventSchema>;

export const clientEventSchema = z.discriminatedUnion("type", [
  clientTaskEventSchema,
]);

export type ClientEvent = z.infer<typeof clientEventSchema>;
