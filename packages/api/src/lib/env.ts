import { config } from "dotenv";
import z from "zod";

config({ quiet: true, path: ["../../.env", ".env"] });

const envSchema = z.object({
  RADARR_URL: z.url().optional(),
  RADARR_API_KEY: z.string().optional(),

  SONARR_URL: z.url().optional(),
  SONARR_API_KEY: z.string().optional(),

  DATA_FOLDER_PATH: z.string(),

  MEDIA_FOLDER_PATH: z.string().optional(),

  DB_FILE_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
