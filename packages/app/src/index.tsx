import { createRoot } from "react-dom/client";
import "./styles.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

const root = createRoot(document.getElementById("root")!);

const router = createRouter({ routeTree });

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
