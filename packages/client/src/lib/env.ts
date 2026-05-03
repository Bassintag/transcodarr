import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: [".env", "../../.env"], quiet: true });

const envSchema = z.object({
  API_URL: z.url(),
});

export const env = envSchema.parse(process.env);
