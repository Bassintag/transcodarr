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
  valid: int({ mode: "boolean" }).notNull().default(true),
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
    profileId: int().notNull(),
    provider: text({ enum: ["radarr", "sonarr"] }).notNull(),
    providerId: int().notNull(),
  },
  (table) => [
    unique("provider_providerId").on(table.provider, table.providerId),
  ],
);

export const profiles = sqliteTable("profile", {
  id: int().primaryKey({ autoIncrement: true }),
  audioBitRate: int(),
  audioChannels: int(),
  audioCodec: text(),
  container: text(),
  title: text().notNull(),
  videoBitRate: int(),
  videoCodec: text(),
  videoResolution: text(),
});

export const clients = sqliteTable("client", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull().unique(),
  status: text({ enum: ["online", "offline"] }).notNull(),
});

export const tasks = sqliteTable("task", {
  id: int().primaryKey({ autoIncrement: true }),
  clientId: int().notNull(),
  fileId: int().notNull(),
  progress: int().notNull().default(0),
  lastHeartbeatAt: int({ mode: "timestamp" }).notNull(),
});

export const relations = defineRelations(
  { clients, files, images, medias, profiles, tasks },
  (r) => ({
    clients: {
      tasks: r.many.tasks(),
    },
    files: {
      media: r.one.medias({
        optional: false,
        from: r.files.mediaId,
        to: r.medias.id,
      }),
      tasks: r.many.tasks(),
    },
    images: {
      media: r.one.medias({
        optional: false,
        from: r.images.mediaId,
        to: r.medias.id,
      }),
    },
    medias: {
      files: r.many.files(),
      images: r.many.images(),
      profile: r.one.profiles({
        optional: false,
        from: r.medias.profileId,
        to: r.profiles.id,
      }),
    },
    profiles: {
      medias: r.many.medias(),
    },
    tasks: {
      client: r.one.clients({
        optional: false,
        from: r.tasks.clientId,
        to: r.clients.id,
      }),
      file: r.one.files({
        optional: false,
        from: r.tasks.fileId,
        to: r.files.id,
      }),
    },
  }),
);
