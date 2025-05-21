import FloatingDockDemo from "@/components/floating-dock-demo"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24">
        {children}
      </main>
      <FloatingDockDemo />
    </div>
  )
} 