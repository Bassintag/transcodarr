import { oc } from "./lib/oc";
import { fileRoutes } from "./routes/file";
import { mediaRoutes } from "./routes/media";
import { jobRoutes } from "./routes/job";
import { configRoutes } from "./routes/config";
import { clientRoutes } from "./routes/client";
import { taskRoutes } from "./routes/task";

export const router = oc.router({
  client: clientRoutes,
  config: configRoutes,
  file: fileRoutes,
  job: jobRoutes,
  media: mediaRoutes,
  task: taskRoutes,
});
