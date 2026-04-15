import { db } from "#/lib/db";
import { oc } from "#/lib/oc";

const list = oc.file.list.handler(async () => {
  return db.query.files.findMany({
    columns: { id: true, path: true },
  });
});

const get = oc.file.get.handler(async ({ input }) => {
  const file = await db.query.files.findFirst({
    columns: { id: true, path: true },
    where: { id: input.id },
  });
  if (file == null) throw new Error("Not found");
  return file;
});

export const fileRoutes = { list, get };
