import { oc } from "#/lib/oc";
import { clientService } from "#/services/client";

const list = oc.client.list.handler(async function () {
  return clientService.list();
});

const create = oc.client.create.handler(async function ({ input }) {
  return clientService.create(input);
});

const getEvents = oc.client.getEvents.handler(async function* ({
  input,
  signal,
}) {
  async function cleanup() {
    signal?.removeEventListener("abort", cleanup);
    await clientService.disconnect(input.id);
  }

  signal?.addEventListener("abort", cleanup);
  const client = await clientService.connect(input.id);
  return clientService.bus.subscribe(client.busId, { signal });
});

export const clientRoutes = { list, create, getEvents };
