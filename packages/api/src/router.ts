import { oc } from "./lib/oc";
import { fileRoutes } from "./routes/file";

export const router = oc.router({
  file: fileRoutes,
});
