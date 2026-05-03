import { db } from "#/lib/db";
import { MemoryPublisher } from "@orpc/experimental-publisher/memory";
import type { ClientEvent, SetClient } from "@transcodarr/contract";
import { clients } from "@transcodarr/db";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";

const bus = new MemoryPublisher<Record<string, ClientEvent>>();

interface ConnectedClient {
  id: number;
  busId: string;
  send: (e: ClientEvent) => Promise<void>;
}

const connectedClients = new Map<number, ConnectedClient>();

function list() {
  return db.query.clients.findMany({
    columns: {
      id: true,
      title: true,
      status: true,
    },
    orderBy: {
      title: "asc",
    },
  });
}

function create(data: SetClient) {
  return db
    .insert(clients)
    .values({ title: data.title, status: "offline" })
    .onConflictDoUpdate({ target: clients.title, set: { status: "offline" } })
    .returning({ id: clients.id, title: clients.title, status: clients.status })
    .get();
}

async function getAvailable() {
  const client = await db.query.clients.findFirst({
    columns: { id: true },
    where: { status: "online" },
  });
  if (client == null) return null;
  return connectedClients.get(client.id) ?? null;
}

async function connect(id: number) {
  if (connectedClients.has(id)) {
    throw new Error("Client already connected");
  }
  const busId = v4();
  const connectedClient: ConnectedClient = {
    id,
    busId,
    send: (e) => {
      return bus.publish(busId, e);
    },
  };
  connectedClients.set(id, connectedClient);
  await db.update(clients).set({ status: "online" }).where(eq(clients.id, id));
  return connectedClient;
}

async function disconnect(id: number) {
  await db.update(clients).set({ status: "offline" }).where(eq(clients.id, id));
  connectedClients.delete(id);
}

export const clientService = {
  bus,
  list,
  create,
  getAvailable,
  connect,
  disconnect,
};
