"use client"

import { motion } from "framer-motion"
import { IconDashboard, IconUpload, IconMessage, IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FloatingDockDemo() {
  const pathname = usePathname()

  const items = [
    {
      name: "Dashboard",
      icon: IconDashboard,
      href: "/dashboard",
    },
    {
      name: "Upload",
      icon: IconUpload,
      href: "/upload",
    },
    {
      name: "Chat",
      icon: IconMessage,
      href: "/chat",
    },
    {
      name: "Settings",
      icon: IconSettings,
      href: "/settings",
    },
  ]

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-lg"
      >
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative rounded-full p-3 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-6 w-6" />
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-primary"
                  style={{ zIndex: -1 }}
                />
              )}
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
} 