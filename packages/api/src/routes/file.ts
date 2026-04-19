import { oc } from "#/lib/oc";
import { fileService } from "#/services/file";

const list = oc.file.list.handler(async ({ input }) => {
  return fileService.list(input.query);
});

const get = oc.file.get.handler(async ({ input }) => {
  return fileService.get(input.params.id);
});

export const fileRoutes = { list, get };
