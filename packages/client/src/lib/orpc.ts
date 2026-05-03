import { createORPCClient } from "@orpc/client";
import { type ContractRouterClient } from "@orpc/contract";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { contract } from "@transcodarr/contract";
import { env } from "./env";

const link = new OpenAPILink(contract, {
  url: env.API_URL,
});

export const orpc =
  createORPCClient<ContractRouterClient<typeof contract>>(link);
