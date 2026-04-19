import type { Image, Media } from "@transcodarr/contract";
import { useMemo, type ComponentProps } from "react";

export function MediaImage({
  type,
  media,
  ...props
}: ComponentProps<"img"> & {
  type: Image["type"];
  media: Media;
}) {
  const src = useMemo(() => {
    const image = media.images.find((i) => i.type === type);
    if (image == null) return undefined;
    return new URL(image.url, import.meta.env.PUBLIC_IMAGES_URL).href;
  }, [media, type]);

  return <img src={src} {...props} />;
}
