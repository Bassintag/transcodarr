import { LoggingHandlerPlugin } from "@orpc/experimental-pino";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import pino from "pino";
import { router } from "./router";
import { v4 } from "uuid";

const logger = pino();

const handler = new OpenAPIHandler(router, {
  plugins: [
    new LoggingHandlerPlugin({
      logger,
      generateId: () => v4(),
      logRequestAbort: true,
      logRequestResponse: true,
    }),
    new CORSPlugin(),
    new ZodSmartCoercionPlugin(),
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
