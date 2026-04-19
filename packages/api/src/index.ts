import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import { router } from "./router";

const handler = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin(), new ZodSmartCoercionPlugin()],
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
