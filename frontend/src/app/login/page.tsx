import LoginForm from "@/components/login-form"
import FloatingDockDemo from "@/components/floating-dock-demo"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        <LoginForm />
      </div>
      <FloatingDockDemo />
    </div>
  )
} 