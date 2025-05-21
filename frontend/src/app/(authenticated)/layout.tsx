import FloatingDockDemo from "@/components/floating-dock-demo"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <FloatingDockDemo />
    </div>
  )
} 