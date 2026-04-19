import { Sidebar, SidebarLink } from "#/components/layout/Sidebar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import {
  LogsIcon,
  PlayCircleIcon,
  ServerIcon,
  SettingsIcon,
} from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Sidebar>
        <SidebarLink>
          <PlayCircleIcon />
          Media
        </SidebarLink>
        <SidebarLink>
          <ServerIcon />
          System
        </SidebarLink>
        <SidebarLink>
          <LogsIcon />
          Logs
        </SidebarLink>
        <SidebarLink>
          <SettingsIcon />
          Settings
        </SidebarLink>
      </Sidebar>
      <div className="ml-64 p-4">
        <Outlet />
      </div>
    </>
  );
}
