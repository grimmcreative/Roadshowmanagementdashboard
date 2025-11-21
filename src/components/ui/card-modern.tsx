import * as React from "react";
import { cn } from "./utils";

function CardModern({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white flex flex-col gap-6 rounded-2xl border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-md transition-all duration-200",
        className,
      )}
      {...props}
    />
  );
}

function CardModernHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardModernTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none text-gray-900 dark:text-white font-semibold", className)}
      {...props}
    />
  );
}

function CardModernDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-gray-500 dark:text-[#8e8e8e]", className)}
      {...props}
    />
  );
}

function CardModernAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardModernContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardModernFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  CardModern,
  CardModernHeader,
  CardModernFooter,
  CardModernTitle,
  CardModernAction,
  CardModernDescription,
  CardModernContent,
};
