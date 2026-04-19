import { oc } from "../oc";
import { configSchema } from "../schemas";

const get = oc
  .route({
    method: "GET",
    path: "/",
  })
  .output(configSchema);

export const configContract = oc.prefix("/config").router({ get });
