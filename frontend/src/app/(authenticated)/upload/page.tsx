import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadButton } from "@/components/ui/upload-button"

export default function UploadPage() {
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
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12">
              <UploadButton />
              <p className="mt-4 text-sm text-muted-foreground">
                Drag and drop your PDF files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported format: PDF (max 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Your recently uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for recent uploads */}
              <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 