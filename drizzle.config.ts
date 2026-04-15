import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./packages/db/generated",
  schema: "./packages/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
