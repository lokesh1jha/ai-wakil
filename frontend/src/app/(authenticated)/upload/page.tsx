"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadButton } from "@/components/ui/upload-button"
import { IconFileText, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (files: File[]) => {
    setIsUploading(true)
    try {
      // TODO: Implement actual file upload to backend
      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUploadedFiles((prev) => [...prev, ...files])
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Upload Documents</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Legal Documents</CardTitle>
            <CardDescription>
              Upload your legal documents in PDF format for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadButton
              onUpload={handleUpload}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Your recently uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
              ) : (
                uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <IconFileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <IconX className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 