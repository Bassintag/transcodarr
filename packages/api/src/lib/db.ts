import { drizzle } from "drizzle-orm/libsql";
import { env } from "./env";
import { relations } from "@transcodarr/db";

export const db = drizzle({
  relations,
  connection: env.DB_FILE_NAME,
});
