import { createArrClient } from "#/lib/arr";
import { env } from "#/lib/env";
import { radarrMovieSchema } from "#/schemas/radarr";
import z from "zod";

const client = createArrClient({
  baseUrl: env.RADARR_URL,
  apiKey: env.RADARR_API_KEY,
});

async function listMovies() {
  return client.fetchJson(z.array(radarrMovieSchema), "/api/v3/movie");
}

export const radarrService = {
  client,
  listMovies,
};
