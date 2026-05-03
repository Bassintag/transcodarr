import { db } from "#/lib/db";
import { mediaOptions } from "#/options/media";

async function list() {
  return db.query.medias.findMany({
    ...mediaOptions,
    orderBy: { title: "asc" },
  });
}

async function get(id: number) {
  const media = await db.query.medias.findFirst({
    ...mediaOptions,
    where: { id },
  });
  if (media == null) throw new Error("Not found");
  return media;
}

export const mediaService = { list, get };
