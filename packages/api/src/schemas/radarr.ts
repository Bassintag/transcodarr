import z from "zod";

export const radarrMovieFileSchema = z.object({
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

export type RadarrMovieFile = z.infer<typeof radarrMovieFileSchema>;

export const radarrMovieSchema = z.object({
  id: z.int(),
  title: z.string(),
  originalTitle: z.string(),
  movieFile: radarrMovieFileSchema.optional(),
  images: z.array(
    z.object({
      coverType: z.string(),
      url: z.string(),
      remoteUrl: z.string(),
    }),
  ),
});

export type RadarrMovie = z.infer<typeof radarrMovieSchema>;
