import { oc } from "./lib/oc";
import { fileRoutes } from "./routes/file";
import { mediaRoutes } from "./routes/media";
import { jobRoutes } from "./routes/job";
import { configRoutes } from "./routes/config";

export const router = oc.router({
  config: configRoutes,
  file: fileRoutes,
  media: mediaRoutes,
  job: jobRoutes,
});
