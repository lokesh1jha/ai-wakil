"use client"

import React from "react"
import { FloatingDock } from "@/components/ui/floating-dock"
import {
  IconHome,
  IconUpload,
  IconMessage,
  IconSettings,
} from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function FloatingDockDemo() {
  const pathname = usePathname()

  const links = [
    {
      title: "Dashboard",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Upload",
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
  ]

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock
        items={links.map(link => ({
          ...link,
          href: link.href,
          icon: (
            <Link href={link.href}>
              <div className={`h-full w-full ${pathname === link.href ? 'text-primary' : ''}`}>
                {link.icon}
              </div>
            </Link>
          )
        }))}
      />
    </div>
  )
} 