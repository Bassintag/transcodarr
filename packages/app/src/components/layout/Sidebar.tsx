import { cn } from "#/lib/cn";
import type { ComponentProps } from "react";

export function Sidebar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 left-0 flex flex-col w-64 bg-bg border-r border-border",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarLink({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2 px-4 h-10 *:[svg]:size-4.5 font-sans font-semibold text-sm text-muted border-b border-border hover:text-fg hover:bg-gray-950 transition",
        className,
      )}
      {...props}
    />
  );
}
