import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"

interface UploadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function UploadButton({ className, ...props }: UploadButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90",
        className
      )}
      {...props}
    >
      <Upload className="h-4 w-4" />
      Upload Document
    </motion.button>
  )
} 