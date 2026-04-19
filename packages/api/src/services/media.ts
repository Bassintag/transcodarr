import { db } from "#/lib/db";

const options = {
  columns: {
    id: true,
    title: true,
    provider: true,
    providerId: true,
  },
  with: {
    images: {
      columns: {
        id: true,
        type: true,
        url: true,
      },
    },
  },
} as const;

async function list() {
  return db.query.medias.findMany({
    ...options,
    orderBy: { title: "asc" },
  });
}

async function get(id: number) {
  const media = await db.query.medias.findFirst({
    ...options,
    where: { id },
  });
  if (media == null) throw new Error("Not found");
  return media;
}

export const mediaService = { list, get };
