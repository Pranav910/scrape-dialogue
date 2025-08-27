import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Globe, Video, FileText, Bot, User, ThumbsUp, ThumbsDown } from "lucide-react"
import { toast } from "sonner"

interface DataRecord {
  id: string
  type: string
  content: string
  confidence: number
  timestamp: string
}

interface Message {
  id: string
  type: 'user' | 'agent'
  content: string
  timestamp: string
  data?: DataRecord[]
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'agent',
    content: 'Hello! I\'m ready to help you scrape data from websites. Please provide the website URL and instructions for what data you need.',
    timestamp: '10:30 AM'
  }
]

const mockDataRecords: DataRecord[] = [
  {
    id: '1',
    type: 'product',
    content: 'iPhone 15 Pro - $999 - Apple Store - In Stock',
    confidence: 0.95,
    timestamp: '10:35 AM'
  },
  {
    id: '2',
    type: 'product',
    content: 'Samsung Galaxy S24 - $899 - Best Buy - Limited Stock',
    confidence: 0.88,
    timestamp: '10:36 AM'
  },
  {
    id: '3',
    type: 'product',
    content: 'Google Pixel 8 - $699 - Google Store - Available',
    confidence: 0.92,
    timestamp: '10:37 AM'
  }
]

export function Interactions() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [input, setInput] = useState('')
  const [website, setWebsite] = useState('')
  const [instructions, setInstructions] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim() && !website.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input || `Website: ${website}\nInstructions: ${instructions}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'I\'ve started analyzing the website. Here are the data records I found:',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data: mockDataRecords
      }
      setMessages(prev => [...prev, agentMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleDataFeedback = (recordId: string, feedback: 'good' | 'bad') => {
    toast(`Feedback recorded: ${feedback === 'good' ? 'Good' : 'Needs improvement'}`)
  }

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold">AI Agent Interaction</h1>
        <p className="text-muted-foreground">Communicate with your AI agents and review collected data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Agent Input
            </CardTitle>
            <CardDescription>Provide instructions and resources for your AI agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website URL
              </label>
              <Input
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Instructions
              </label>
              <Textarea
                placeholder="Describe what data you need to extract..."
                className="min-h-[100px]"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Video className="h-4 w-4" />
                Additional Resources (Optional)
              </label>
              <Input
                placeholder="Video URL, document link..."
                type="url"
              />
            </div>

            <Button onClick={handleSendMessage} className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Start Agent'}
            </Button>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
            <CardDescription>Real-time communication with your AI agent</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[500px]">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-muted'}`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div className={`flex-1 space-y-2 ${message.type === 'user' ? 'items-end' : ''}`}>
                        <div className={`p-3 rounded-lg max-w-[80%] ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                    </div>

                    {/* Data Records */}
                    {message.data && (
                      <div className="ml-12 space-y-2">
                        <Separator />
                        <div className="text-sm font-medium">Data Records Found:</div>
                        {message.data.map((record) => (
                          <div key={record.id} className="p-3 border rounded-lg bg-card">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline">{record.type}</Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Confidence: {(record.confidence * 100).toFixed(0)}%
                                  </span>
                                </div>
                                <p className="text-sm">{record.content}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDataFeedback(record.id, 'good')}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDataFeedback(record.id, 'bad')}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <div className="animate-pulse flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Agent is working...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex gap-2 pt-4 border-t">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}