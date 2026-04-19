import { syncImages } from "#/lib/arr";
import { db } from "#/lib/db";
import type { SonarrEpisodeFile, SonarrSeries } from "#/schemas/sonarr";
import { sonarrService } from "#/services/sonarr";
import { files, medias } from "@transcodarr/db";

async function syncSonarrEpisodeFile(
  mediaId: number,
  episodeFile: SonarrEpisodeFile,
) {
  const data = {
    mediaId,
    size: episodeFile.size,
    providerId: episodeFile.id,
    audioBitRate: episodeFile.mediaInfo.audioBitrate,
    audioChannels: episodeFile.mediaInfo.audioChannels,
    audioCodec: episodeFile.mediaInfo.audioCodec,
    resolution: episodeFile.mediaInfo.resolution,
    videoBitDepth: episodeFile.mediaInfo.videoBitDepth,
    videoBitRate: episodeFile.mediaInfo.videoBitrate,
    videoCodec: episodeFile.mediaInfo.videoCodec,
    videoFps: episodeFile.mediaInfo.videoFps,
  };

  await db
    .insert(files)
    .values({ path: episodeFile.path, ...data })
    .onConflictDoUpdate({ target: files.path, set: data });
}

async function syncSonarrMovie(series: SonarrSeries) {
  const inserted = await db
    .insert(medias)
    .values({
      title: series.title,
      provider: "sonarr",
      providerId: series.id,
    })
    .onConflictDoUpdate({
      target: [medias.provider, medias.providerId],
      set: { title: series.title },
    })
    .returning({ id: medias.id })
    .get();

  await syncImages({
    mediaId: inserted.id,
    provider: "sonarr",
    images: series.images,
  });

  const episodeFiles = await sonarrService.listEpisodeFiles({
    query: { seriesId: series.id },
  });

  for (const episodeFile of episodeFiles) {
    await syncSonarrEpisodeFile(inserted.id, episodeFile);
  }
}

export async function syncSonarr() {
  const seriesList = await sonarrService.listSeries();

  for (const series of seriesList) {
    await syncSonarrMovie(series);
  }
}
