import { db } from "#/lib/db";
import { orThrow } from "#/lib/utils";
import { taskOptions } from "#/options/task";
import type { Task, UpdateTask } from "@transcodarr/contract";
import { tasks } from "@transcodarr/db";

async function get(id: number): Promise<Task> {
  return await orThrow(
    db.query.tasks.findFirst({
      ...taskOptions,
      where: { id },
    }),
  );
}

async function update(data: UpdateTask): Promise<Task> {
  const { id } = await db
    .update(tasks)
    .set({
      progress: data.progress,
      lastHeartbeatAt: new Date(),
    })
    .returning({ id: tasks.id })
    .get();
  return get(id);
}

export const taskService = { get, update };
