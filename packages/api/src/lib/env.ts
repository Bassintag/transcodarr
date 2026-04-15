import { config } from "dotenv";
import z from "zod";

config({ quiet: true, path: ["../../.env", ".env"] });

const envSchema = z.object({
  DB_FILE_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
