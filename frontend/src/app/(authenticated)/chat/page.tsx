"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconFileText, IconX, IconHistory } from "@tabler/icons-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for uploaded documents
const mockDocuments = [
  { id: "1", name: "Contract Agreement.pdf", date: "2024-03-20" },
  { id: "2", name: "Legal Notice.pdf", date: "2024-03-19" },
  { id: "3", name: "Court Order.pdf", date: "2024-03-18" },
]

// Mock chat history
const mockChatHistory = [
  {
    id: "1",
    title: "Contract Analysis",
    documents: ["Contract Agreement.pdf"],
    lastMessage: "What are the key terms?",
    date: "2024-03-20",
  },
  {
    id: "2",
    title: "Legal Notice Review",
    documents: ["Legal Notice.pdf", "Court Order.pdf"],
    lastMessage: "Explain the implications",
    date: "2024-03-19",
  },
]

export default function ChatPage() {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isChatStarted, setIsChatStarted] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocuments(prev => {
      if (prev.includes(documentId)) {
        return prev.filter(id => id !== documentId)
      }
      return [...prev, documentId]
    })
  }

  const handleStartChat = () => {
    if (selectedDocuments.length > 0) {
      setIsChatStarted(true)
      setMessages([{
        role: "assistant",
        content: `I've analyzed ${selectedDocuments.length} document(s). What would you like to know about them?`
      }])
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isChatStarted) return

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: inputMessage }])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing your documents and will provide a response shortly. This is a simulated response for demonstration purposes."
      }])
    }, 1000)
  }

  const selectedDocumentNames = selectedDocuments.map(id => 
    mockDocuments.find(doc => doc.id === id)?.name
  ).filter(Boolean)

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chat with AI Wakil</h1>
        <Button
          variant="outline"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2"
        >
          <IconHistory className="h-4 w-4" />
          {showHistory ? "Hide History" : "Show History"}
        </Button>
      </div>
      
      <div className="grid gap-6">
        {showHistory && (
          <Card>
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>Your previous conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-muted/50"
                  >
                    <div>
                      <h3 className="font-medium">{chat.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chat.documents.join(", ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last message: {chat.lastMessage}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{chat.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Legal Assistant Chat</CardTitle>
            <CardDescription>
              Select documents and start a conversation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full flex-col">
            {!isChatStarted ? (
              <>
                {/* Document Selection */}
                <div className="mb-6">
                  <Select
                    onValueChange={handleDocumentSelect}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select documents to chat about" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDocuments.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex items-center gap-2">
                            <IconFileText className="h-4 w-4" />
                            <span>{doc.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected Documents */}
                {selectedDocuments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium">Selected Documents:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDocumentNames.map((name, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {name}
                          <IconX
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleDocumentSelect(selectedDocuments[index])}
                          />
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="mt-4 w-full"
                      onClick={handleStartChat}
                    >
                      Start Chat
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Selected Documents Display */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedDocumentNames.map((name, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {name}
                    </Badge>
                  ))}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 ${
                        message.role === "user" ? "justify-end" : ""
                      }`}
                    >
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Type your question here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                  >
                    Send
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 