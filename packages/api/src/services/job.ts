import { syncRadarr } from "#/jobs/sync-radarr";
import { syncSonarr } from "#/jobs/sync-sonarr";
import type { CreateJob } from "@transcodarr/contract";

async function create(data: CreateJob) {
  switch (data.type) {
    case "sync-radarr":
      return syncRadarr();
    case "sync-sonarr":
      return syncSonarr();
  }
}

export const jobService = { create };
