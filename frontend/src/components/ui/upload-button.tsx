"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { IconUpload } from "@tabler/icons-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface UploadButtonProps {
  onUpload?: (files: File[]) => void
  className?: string
}

export function UploadButton({ onUpload, className }: UploadButtonProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false)
      if (onUpload) {
        onUpload(acceptedFiles)
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/25 hover:border-primary/50",
        className
      )}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <IconUpload className="mb-2 h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">
        {isDragActive
          ? "Drop your PDF here"
          : "Click or drag PDF to upload"}
      </p>
    </div>
  )
} 