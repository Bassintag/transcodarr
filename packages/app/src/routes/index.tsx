import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { queries } from "#/orpc";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery(queries.file.list.queryOptions());
  return <div>Hello "/"!</div>;
}
