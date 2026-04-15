import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { defineRelations } from "drizzle-orm";

export const files = sqliteTable("files", {
  id: int().primaryKey({ autoIncrement: true }),
  path: text().notNull().unique(),
});

export const relations = defineRelations({ files });
