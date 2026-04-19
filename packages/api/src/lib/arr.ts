import qs from "qs";
import type z from "zod";
import { db } from "./db";
import { images } from "@transcodarr/db";
import { eq } from "drizzle-orm";
import { imageService } from "#/services/image";

const imageTypes = ["poster", "fanart"] as const;

export function filterImages(
  images: { coverType: string; remoteUrl: string }[],
) {
  return images
    .filter((i) =>
      imageTypes.includes(i.coverType as (typeof imageTypes)[number]),
    )
    .map((i) => ({
      type: i.coverType as (typeof imageTypes)[number],
      url: i.remoteUrl,
    }));
}

export interface ArrRequestInit extends RequestInit {
  query?: unknown;
}

export function createArrClient({
  baseUrl,
  apiKey,
}: {
  baseUrl?: string;
  apiKey?: string;
}) {
  async function fetchArr(path: string, init: ArrRequestInit = {}) {
    const url = new URL(path, baseUrl);
    if (init.query) {
      url.search = qs.stringify(init.query);
    }
    if (apiKey) {
      init.headers = new Headers(init.headers);
      init.headers.set("x-api-key", apiKey);
    }
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error("Failed to fetch Radarr");
    }
    return response;
  }

  async function fetchArrJson<T extends z.ZodType>(
    schema: T,
    path: string,
    init?: ArrRequestInit,
  ) {
    const response = await fetchArr(path, init);
    const json = await response.json();
    return schema.parse(json);
  }

  return {
    fetch: fetchArr,
    fetchJson: fetchArrJson,
  };
}

export type ArrClient = ReturnType<typeof createArrClient>;

export async function syncImages({
  mediaId,
  provider,
  images: imagesInput,
}: {
  mediaId: number;
  provider: "radarr" | "sonarr";
  images: { coverType: string; remoteUrl: string }[];
}) {
  const filtered = imagesInput
    .filter((i) => {
      return imageTypes.includes(i.coverType as (typeof imageTypes)[number]);
    })
    .map((i) => ({
      type: i.coverType as (typeof imageTypes)[number],
      url: i.remoteUrl,
    }));
  for (const image of filtered) {
    const existing = await db.query.images.findFirst({
      columns: { id: true },
      where: { remoteUrl: image.url },
    });
    if (existing) {
      await db
        .update(images)
        .set({ mediaId, type: image.type })
        .where(eq(images.id, existing.id));
    } else {
      const url = await imageService.importFromArr({
        provider,
        type: image.type,
        url: image.url,
      });
      await db
        .insert(images)
        .values({ mediaId, url, type: image.type, remoteUrl: image.url });
    }
  }
}
