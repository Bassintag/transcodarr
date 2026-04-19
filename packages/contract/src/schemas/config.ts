import z from "zod";

export const configSchema = z.object({
  radarrUrl: z.url().optional(),
  sonarrUrl: z.url().optional(),
});
