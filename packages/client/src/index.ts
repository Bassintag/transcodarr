import { consumeEventIterator } from "@orpc/client";
import os from "os";
import { handleTaskEvent } from "./events/task";
import { orpc } from "./lib/orpc";

async function main() {
  const client = await orpc.client.create({
    title: os.hostname(),
  });

  const events = await orpc.client.getEvents({ id: client.id });

  consumeEventIterator(events, {
    onEvent: (e) => {
      switch (e.type) {
        case "task":
          return handleTaskEvent({ e, client });
      }
    },
  });
}

void main();
