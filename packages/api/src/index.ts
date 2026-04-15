import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { StrictGetMethodPlugin } from "@orpc/server/plugins";
import { router } from "./router";
import { onError } from "@orpc/server";

const handler = new RPCHandler(router, {
  plugins: [new CORSPlugin(), new StrictGetMethodPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

Bun.serve({
  port: 3001,
  async fetch(req) {
    const { matched, response } = await handler.handle(req);
    if (matched) return response;
    return new Response("Not found", { status: 404 });
  },
});

console.log("Server listening on port 3001");
