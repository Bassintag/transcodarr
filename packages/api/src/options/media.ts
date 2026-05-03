import type { db } from "#/lib/db";
import { profileOptions } from "./profile";

export const mediaOptions = {
  columns: {
    id: true,
    title: true,
    provider: true,
    providerId: true,
  },
  with: {
    profile: profileOptions,
    images: {
      columns: {
        id: true,
        type: true,
        url: true,
      },
    },
  },
} satisfies Parameters<typeof db.query.medias.findFirst>[0];
