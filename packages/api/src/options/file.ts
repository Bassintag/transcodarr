import type { db } from "#/lib/db";
import { mediaOptions } from "./media";

export const fileOptions = {
  columns: {
    id: true,
    audioBitRate: true,
    audioChannels: true,
    audioCodec: true,
    path: true,
    resolution: true,
    size: true,
    valid: true,
    videoBitDepth: true,
    videoBitRate: true,
    videoCodec: true,
    videoFps: true,
  },
  with: {
    media: mediaOptions,
  },
} satisfies Parameters<typeof db.query.files.findFirst>[0];
