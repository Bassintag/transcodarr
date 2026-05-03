import { syncRadarr } from "#/jobs/sync-radarr";
import { syncSonarr } from "#/jobs/sync-sonarr";
import { transcodeFile } from "#/jobs/transcode-file";
import type { CreateJob } from "@transcodarr/contract";

async function create(data: CreateJob) {
  switch (data.type) {
    case "sync-radarr":
      return syncRadarr();
    case "sync-sonarr":
      return syncSonarr();
    case "transcode-file":
      return transcodeFile(data);
  }
}

export const jobService = { create };
