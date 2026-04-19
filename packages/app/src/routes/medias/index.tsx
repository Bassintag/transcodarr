import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { queries } from "#/orpc";
import { MediaImage } from "#/components/media/MediaImage";

export const Route = createFileRoute("/medias/")({
  component: RouteComponent,
});

function RouteComponent() {
  const medias = useQuery(queries.media.list.queryOptions());

  return (
    <div className="flex flex-col gap-4">
      {medias.data?.map((media) => (
        <Route.Link
          to={"/medias/$id"}
          params={{ id: media.id }}
          className="border border-border bg-bg flex flex-row gap-4 items-center"
          key={media.id}
        >
          <MediaImage
            media={media}
            type="poster"
            loading="lazy"
            className="w-16 aspect-210/297"
          />
          <div className="font-mono text-lg font-medium">{media.title}</div>
        </Route.Link>
      ))}
    </div>
  );
}
