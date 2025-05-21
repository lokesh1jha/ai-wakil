import SignupFormDemo from "@/components/signup-form-demo"
import FloatingDockDemo from "@/components/floating-dock-demo"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        <SignupFormDemo />
      </div>
      <FloatingDockDemo />
    </div>
  )
} 