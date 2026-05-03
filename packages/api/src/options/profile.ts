import type { db } from "#/lib/db";

export const profileOptions = {
  columns: {
    id: true,
    title: true,
    audioBitRate: true,
    audioChannels: true,
    audioCodec: true,
    container: true,
    videoBitRate: true,
    videoCodec: true,
    videoResolution: true,
  },
} satisfies Parameters<typeof db.query.profiles.findFirst>[0];
