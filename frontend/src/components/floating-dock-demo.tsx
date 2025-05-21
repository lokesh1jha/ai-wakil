import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconUpload,
  IconMessage,
  IconSettings,
  IconLogout,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Dashboard",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Upload Document",
      icon: (
        <IconUpload className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/upload",
    },
    {
      title: "Chat",
      icon: (
        <IconMessage className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/chat",
    },
    {
      title: "Settings",
      icon: (
        <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/settings",
    },
    {
      title: "Dark Mode",
      icon: (
        <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Logout",
      icon: (
        <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/logout",
    },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
} 