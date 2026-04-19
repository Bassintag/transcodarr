import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { type ContractRouterClient } from "@orpc/contract";
import { contract } from "@transcodarr/contract";

const link = new OpenAPILink(contract, {
  url: "http://localhost:3001",
});

export const client =
  createORPCClient<ContractRouterClient<typeof contract>>(link);

export const queries = createTanstackQueryUtils(client);
