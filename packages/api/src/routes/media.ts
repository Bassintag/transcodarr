import { oc } from "#/lib/oc";
import { mediaService } from "#/services/media";

const list = oc.media.list.handler(async () => {
  return mediaService.list();
});

const get = oc.media.get.handler(async ({ input }) => {
  return mediaService.get(input.params.id);
});

export const mediaRoutes = { list, get };
