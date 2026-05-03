import { oc } from "#/lib/oc";
import { fileService } from "#/services/file";

const list = oc.file.list.handler(async ({ input }) => {
  return fileService.list(input);
});

const get = oc.file.get.handler(async ({ input }) => {
  return fileService.get(input.id);
});

const getContent = oc.file.getContent.handler(async ({ input }) => {
  return fileService.getContent(input.id);
});

export const fileRoutes = { list, get, getContent };
