import { defineRelations } from "drizzle-orm";
import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const files = sqliteTable("file", {
  id: int().primaryKey({ autoIncrement: true }),
  audioBitRate: int().notNull(),
  audioChannels: real().notNull(),
  audioCodec: text().notNull(),
  mediaId: int().notNull(),
  path: text().notNull().unique(),
  providerId: int().notNull(),
  resolution: text().notNull(),
  size: int().notNull(),
  videoBitDepth: int().notNull(),
  videoBitRate: int().notNull(),
  videoCodec: text().notNull(),
  videoFps: real().notNull(),
});

export const images = sqliteTable(
  "image",
  {
    id: int().primaryKey({ autoIncrement: true }),
    mediaId: int().notNull(),
    type: text({ enum: ["poster", "fanart"] }).notNull(),
    url: text().notNull().unique(),
    remoteUrl: text().notNull().unique(),
  },
  (table) => [unique("mediaId_type").on(table.mediaId, table.type)],
);

export const medias = sqliteTable(
  "media",
  {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    profileId: int(),
    provider: text({ enum: ["radarr", "sonarr"] }).notNull(),
    providerId: int().notNull(),
    valid: int({ mode: "boolean" }).notNull().default(true),
  },
  (table) => [
    unique("provider_providerId").on(table.provider, table.providerId),
  ],
);

export const profiles = sqliteTable("profile", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  audioCodec: int(),
  audioBitRate: int(),
  audioChannels: int(),
  videoBitRate: int(),
  videoCodec: text(),
  videoResolution: text(),
  container: text(),
});

export const relations = defineRelations(
  { files, images, medias, profiles },
  (r) => ({
    files: {
      media: r.one.medias({ from: r.files.mediaId, to: r.medias.id }),
    },
    images: {
      media: r.one.medias({ from: r.images.mediaId, to: r.medias.id }),
    },
    medias: {
      files: r.many.files(),
      images: r.many.images(),
      profiles: r.one.profiles({
        optional: true,
        from: r.medias.profileId,
        to: r.profiles.id,
      }),
    },
    profiles: {
      medias: r.many.medias(),
    },
  }),
);
