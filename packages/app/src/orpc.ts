import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { RPCLink } from "@orpc/client/fetch";
import { type ContractRouterClient } from "@orpc/contract";
import { contract } from "@transcodarr/contract";

const link = new RPCLink({
  url: "http://localhost:3001",
});

export const client =
  createORPCClient<ContractRouterClient<typeof contract>>(link);

export const queries = createTanstackQueryUtils(client);
