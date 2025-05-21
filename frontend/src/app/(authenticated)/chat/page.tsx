import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Chat with AI Wakil</h1>
      
      <div className="grid gap-6">
        <Card className="h-[calc(100vh-16rem)]">
          <CardHeader>
            <CardTitle>Legal Assistant Chat</CardTitle>
            <CardDescription>
              Ask questions about your legal documents
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto">
              {/* Chat messages will go here */}
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm">Hello! I'm your AI legal assistant. How can I help you today?</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Type your question here..."
                className="flex-1"
              />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 