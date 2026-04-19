import { createORPCClient } from "@orpc/client";
import { type ContractRouterClient } from "@orpc/contract";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { contract } from "@transcodarr/contract";

const link = new OpenAPILink(contract, {
  url: "http://localhost:3001",
});

export const client =
  createORPCClient<ContractRouterClient<typeof contract>>(link);
