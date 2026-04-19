import { syncImages } from "#/lib/arr";
import { db } from "#/lib/db";
import type { RadarrMovie, RadarrMovieFile } from "#/schemas/radarr";
import { radarrService } from "#/services/radarr";
import { files, medias } from "@transcodarr/db";

async function syncRadarrMovieFile(
  mediaId: number,
  movieFile: RadarrMovieFile,
) {
  const data = {
    mediaId,
    size: movieFile.size,
    providerId: movieFile.id,
    audioBitRate: movieFile.mediaInfo.audioBitrate,
    audioChannels: movieFile.mediaInfo.audioChannels,
    audioCodec: movieFile.mediaInfo.audioCodec,
    resolution: movieFile.mediaInfo.resolution,
    videoBitDepth: movieFile.mediaInfo.videoBitDepth,
    videoBitRate: movieFile.mediaInfo.videoBitrate,
    videoCodec: movieFile.mediaInfo.videoCodec,
    videoFps: movieFile.mediaInfo.videoFps,
  };

  await db
    .insert(files)
    .values({ path: movieFile.path, ...data })
    .onConflictDoUpdate({ target: files.path, set: data });
}

async function syncRadarrMovie(movie: RadarrMovie) {
  const inserted = await db
    .insert(medias)
    .values({
      title: movie.title,
      provider: "radarr",
      providerId: movie.id,
    })
    .onConflictDoUpdate({
      target: [medias.provider, medias.providerId],
      set: { title: movie.title },
    })
    .returning({ id: medias.id })
    .get();

  await syncImages({
    mediaId: inserted.id,
    provider: "radarr",
    images: movie.images,
  });

  if (movie.movieFile) {
    await syncRadarrMovieFile(inserted.id, movie.movieFile);
  }
}

export async function syncRadarr() {
  const movies = await radarrService.listMovies();

  for (const movie of movies) {
    await syncRadarrMovie(movie);
  }
}
