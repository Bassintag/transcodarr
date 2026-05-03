import { Client, ClientTaskEvent, File } from "@transcodarr/contract";
import path from "path";
import fs from "fs";
import { env } from "../lib/env";
import { progress } from "../lib/progress";
import prettyBytes from "pretty-bytes";
import { orpc } from "../lib/orpc";

async function downloadFile({ e }: { e: ClientTaskEvent }) {
  const fileName = `${e.task.id}.in.${path.extname(e.task.file.path)}`;
  const partFileName = fileName + ".part";
  const filePath = path.resolve(fileName);
  const partFilePath = path.resolve(partFileName);
  const response = await fetch(
    new URL(`files/${e.task.file.id}/content`, env.API_URL),
  );
  const partFile = Bun.file(partFilePath);
  const partFileWriter = partFile.writer();
  const totalBytes = parseInt(response.headers.get("content-length") ?? "0");
  {
    let processed = 0;
    using p = progress({
      total: totalBytes,
      options: {
        format: "📥 {bar} {percentage}% | {value}/{total} | {eta}s",
        barCompleteChar: "█",
        barIncompleteChar: "░",
        formatValue: (v, _, type) => {
          if (type === "value" || type === "total") {
            return prettyBytes(+v);
          }
          return v.toString();
        },
        fps: 2,
        etaBuffer: 200,
      },
    });
    for await (const chunk of response.body!) {
      await partFileWriter.write(chunk);
      processed += chunk.byteLength;
      p.bar.update(processed);
    }
  }
  await fs.promises.rename(partFilePath, filePath);
  return filePath;
}

async function transcodeFile({
  e,
  filePath,
}: {
  e: ClientTaskEvent;
  filePath: string;
}) {
  const profile = e.task.file.media.profile;
  const oputputPath = `${e.task.id}.out.${profile.container}`;

  const cmd = [
    "ffmpeg",
    "-i",
    filePath,

    // Vidéo
    "-c:v",
    profile.videoCodec,
    "-b:v",
    `${profile.videoBitRate}k`,
  ];

  cmd.push("-c:a", profile.audioCodec, "-b:a", `${profile.audioBitRate}k`);

  if (profile.audioChannels > 0) {
    cmd.push("-ac", String(profile.audioChannels));
  }

  if (profile.container === "mp4") {
    cmd.push("-movflags", "+faststart");
  }

  cmd.push("-y", oputputPath);

  console.log("SPAWN", cmd);

  const proc = Bun.spawn(cmd);

  const decoder = new TextDecoder();
  for await (const chunk of proc.stdout) {
    const decoded = decoder.decode(chunk);
    console.log("GOT CHUNK:", decoded);
  }
}

export async function handleTaskEvent({
  e,
}: {
  e: ClientTaskEvent;
  client: Client;
}) {
  const interval = setInterval(async () => {
    await orpc.task.update({ id: e.task.id, progress: 0 });
  }, 5_000);

  try {
    const filePath = await downloadFile({ e });
    await transcodeFile({ e, filePath });
  } finally {
    clearInterval(interval);
  }
  // for await (const line of Bun.$`ffmpeg`.lines()) {
  //   console.log("LINE:", line);
  // }
}
