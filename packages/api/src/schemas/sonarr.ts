import z from "zod";

export const sonarrEpisodeFileSchema = z.object({
  id: z.int(),
  path: z.string(),
  size: z.int(),
  mediaInfo: z.object({
    audioBitrate: z.int(),
    audioChannels: z.number(),
    audioCodec: z.string(),
    videoBitDepth: z.int(),
    videoBitrate: z.int(),
    videoCodec: z.string(),
    videoFps: z.number(),
    resolution: z.string(),
  }),
});

export type SonarrEpisodeFile = z.infer<typeof sonarrEpisodeFileSchema>;

export const sonarrSeriesSchema = z.object({
  id: z.int(),
  title: z.string(),
  images: z.array(
    z.object({
      coverType: z.string(),
      url: z.string(),
      remoteUrl: z.string(),
    }),
  ),
});

export type SonarrSeries = z.infer<typeof sonarrSeriesSchema>;
