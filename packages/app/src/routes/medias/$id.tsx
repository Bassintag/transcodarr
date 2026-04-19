import { MediaImage } from "#/components/media/MediaImage";
import { queries } from "#/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { idParamsSchema } from "@transcodarr/contract";

export const Route = createFileRoute("/medias/$id")({
  component: RouteComponent,
  params: idParamsSchema,
});

function RouteComponent() {
  const params = Route.useParams();
  const media = useSuspenseQuery(
    queries.media.get.queryOptions({ input: { params: { id: params.id } } }),
  );

  return (
    <div>
      <MediaImage media={media.data} type="fanart" className="w-full" />
    </div>
  );
}
