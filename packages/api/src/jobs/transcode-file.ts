import { db } from "#/lib/db";
import { clientService } from "#/services/client";
import { taskService } from "#/services/task";
import type { CreateTranscodeFileJob } from "@transcodarr/contract";
import { tasks } from "@transcodarr/db";

export async function transcodeFile(data: CreateTranscodeFileJob) {
  const client = await clientService.getAvailable();
  if (client == null) throw new Error("No client available");
  const { id } = await db
    .insert(tasks)
    .values({
      clientId: client.id,
      fileId: data.fileId,
      lastHeartbeatAt: new Date(),
    })
    .returning({ id: tasks.id })
    .get();
  const task = await taskService.get(id);
  await client.send({ type: "task", task });
  // client.send({ type: "task"});
}
