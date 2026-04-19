import type { ArrClient } from "#/lib/arr";
import { v4 } from "uuid";
import { radarrService } from "./radarr";
import { sonarrService } from "./sonarr";
import path from "node:path";
import { env } from "#/lib/env";
import sharp, { type ResizeOptions } from "sharp";

async function importFromArr({
  provider,
  type,
  url,
}: {
  provider: "radarr" | "sonarr";
  type: "poster" | "fanart";
  url: string;
}) {
  let client: ArrClient;
  switch (provider) {
    case "radarr":
      client = radarrService.client;
      break;
    case "sonarr":
      client = sonarrService.client;
      break;
  }
  const response = await client.fetch(url);
  let resizeOptions: ResizeOptions;
  switch (type) {
    case "poster":
      resizeOptions = { height: 500 };
      break;
    case "fanart":
      resizeOptions = {
        width: 1920,
        height: 1080,
        fit: "cover",
        position: "center",
      };
      break;
  }
  const imageData = await sharp(await response.arrayBuffer())
    .resize(resizeOptions)
    .webp()
    .toBuffer();
  const id = v4();
  const relativePath = path.join(type, `${id}.webp`);
  const filePath = path.join(env.DATA_FOLDER_PATH, "images", relativePath);
  Bun.write(filePath, imageData);
  return relativePath;
}

export const imageService = { importFromArr };
