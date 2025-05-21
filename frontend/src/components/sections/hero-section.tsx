import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { UploadButton } from "@/components/ui/upload-button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Your AI-Powered Legal Assistant
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Get instant legal insights, document analysis, and personalized guidance
            powered by advanced artificial intelligence.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <UploadButton />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
      </div>
    </section>
  )
} 