import { db } from "#/lib/db";
import type { FilesQuery } from "@transcodarr/contract";

const columns = { id: true, path: true } as const;

async function list(query: FilesQuery) {
  return db.query.files.findMany({
    columns,
    where: { mediaId: query.mediaId },
    orderBy: { path: "asc" },
  });
}

async function get(id: number) {
  const file = await db.query.files.findFirst({
    columns,
    where: { id },
  });
  if (file == null) throw new Error("Not found");
  return file;
}

export const fileService = { list, get };
