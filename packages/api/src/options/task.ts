import type { db } from "#/lib/db";
import { fileOptions } from "./file";

export const taskOptions = {
  columns: { id: true, progress: true },
  with: { file: fileOptions },
} satisfies Parameters<typeof db.query.tasks.findFirst>[0];
