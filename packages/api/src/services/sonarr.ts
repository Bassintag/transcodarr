import { createArrClient } from "#/lib/arr";
import { env } from "#/lib/env";
import { sonarrEpisodeFileSchema, sonarrSeriesSchema } from "#/schemas/sonarr";
import z from "zod";

const client = createArrClient({
  baseUrl: env.SONARR_URL,
  apiKey: env.SONARR_API_KEY,
});

async function listSeries() {
  return client.fetchJson(z.array(sonarrSeriesSchema), "/api/v3/series");
}

async function listEpisodeFiles({ query }: { query?: { seriesId?: number } }) {
  return client.fetchJson(
    z.array(sonarrEpisodeFileSchema),
    "/api/v3/episodeFile",
    { query },
  );
}

export const sonarrService = {
  client,
  listSeries,
  listEpisodeFiles,
};
