import { env } from "#/lib/env";
import { oc } from "#/lib/oc";

const get = oc.config.get.handler(() => {
  return {
    radarrUrl: env.RADARR_URL,
    sonarrUrl: env.SONARR_URL,
  };
});

export const configRoutes = { get };
