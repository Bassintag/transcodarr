import { db } from "#/lib/db";
import { env } from "#/lib/env";
import { orThrow } from "#/lib/utils";
import { fileOptions } from "#/options/file";
import type { FilesQuery } from "@transcodarr/contract";
import path from "path";

async function list(query: FilesQuery) {
  return db.query.files.findMany({
    ...fileOptions,
    where: { mediaId: query.mediaId },
    orderBy: { path: "asc" },
  });
}

async function get(id: number) {
  return orThrow(
    db.query.files.findFirst({
      ...fileOptions,
      where: { id },
    }),
  );
}

async function getContent(id: number) {
  const file = await orThrow(
    db.query.files.findFirst({
      columns: { path: true },
      where: { id },
    }),
  );
  let filePath = file.path;
  if (env.MEDIA_FOLDER_PATH) {
    filePath = path.join(env.MEDIA_FOLDER_PATH, filePath);
  }
  return Bun.file(filePath);
}

export const fileService = { list, get, getContent };
