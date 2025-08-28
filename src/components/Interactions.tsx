import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Globe, Video, FileText, Bot, User } from "lucide-react"
import { toast } from "sonner"
import { AgentSelector } from "./AgentSelector"
import { Agent, ConversationMessage, MultipleChoiceContent } from "@/types/agent"

const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'E-commerce Scraper',
    status: 'active',
    description: 'Specialized in extracting product data from e-commerce websites',
    totalMessages: 124,
    successRate: 94.5,
    lastActive: '2 minutes ago'
  },
  {
    id: 'agent-2', 
    name: 'News Crawler',
    status: 'idle',
    description: 'Extracts articles and content from news websites',
    totalMessages: 67,
    successRate: 89.2,
    lastActive: '15 minutes ago'
  },
  {
    id: 'agent-3',
    name: 'Social Media Monitor',
    status: 'active',
    description: 'Monitors and extracts data from social media platforms',
    totalMessages: 203,
    successRate: 91.8,
    lastActive: '1 minute ago'
  }
]

export function Interactions() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Record<string, ConversationMessage[]>>({})
  const [input, setInput] = useState('')
  const [website, setWebsite] = useState('')
  const [instructions, setInstructions] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const currentMessages = selectedAgent ? conversations[selectedAgent] || [] : []

  const handleSendMessage = async () => {
    if (!selectedAgent) {
      toast("Please select an agent first")
      return
    }
    
    if (!input.trim() && !website.trim()) return

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      agentId: selectedAgent,
      type: 'user',
      content: input || `Website: ${website}\nInstructions: ${instructions}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setConversations(prev => ({
      ...prev,
      [selectedAgent]: [...(prev[selectedAgent] || []), userMessage]
    }))
    
    setInput('')
    setWebsite('')
    setInstructions('')
    setIsLoading(true)

    // Simulate AI agent response with multiple choice format
    setTimeout(() => {
      const mockChoices: MultipleChoiceContent = {
        choice_1: 'Extract product titles and prices',
        choice_2: 'Focus on customer reviews and ratings', 
        choice_3: 'Collect inventory and availability data',
        choice_4: 'Get product specifications and features'
      }

      const agentMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        agentId: selectedAgent,
        type: 'agent',
        content: 'I\'ve analyzed the website. Please choose what type of data you\'d like me to focus on:',
        choices: mockChoices,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setConversations(prev => ({
        ...prev,
        [selectedAgent]: [...(prev[selectedAgent] || []), agentMessage]
      }))
      setIsLoading(false)
    }, 2000)
  }

  const handleChoiceSelect = (messageId: string, choice: string) => {
    if (!selectedAgent) return

    setConversations(prev => ({
      ...prev,
      [selectedAgent]: prev[selectedAgent]?.map(msg => 
        msg.id === messageId 
          ? { ...msg, selectedChoice: choice }
          : msg
      ) || []
    }))

    toast(`Selected: ${choice}`)
  }

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId)
    
    // Initialize conversation if it doesn't exist
    if (!conversations[agentId]) {
      const welcomeMessage: ConversationMessage = {
        id: 'welcome-' + agentId,
        agentId,
        type: 'agent',
        content: `Hello! I'm ${mockAgents.find(a => a.id === agentId)?.name}. I'm ready to help you scrape data. Please provide the website URL and instructions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setConversations(prev => ({
        ...prev,
        [agentId]: [welcomeMessage]
      }))
    }
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
              Agent Control
            </CardTitle>
            <CardDescription>Select your AI agent and provide instructions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AgentSelector 
              agents={mockAgents}
              selectedAgent={selectedAgent}
              onAgentSelect={handleAgentSelect}
            />

            <Separator />
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

            <Button 
              onClick={handleSendMessage} 
              className="w-full" 
              disabled={isLoading || !selectedAgent}
            >
              {isLoading ? 'Processing...' : 'Send Message'}
            </Button>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
            <CardDescription>
              {selectedAgent 
                ? `Chatting with ${mockAgents.find(a => a.id === selectedAgent)?.name}`
                : 'Select an agent to start chatting'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[500px]">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {currentMessages.map((message) => (
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

                    {/* Multiple Choice Options */}
                    {message.choices && (
                      <div className="ml-12 space-y-2">
                        <Separator />
                        <div className="text-sm font-medium">Choose an option:</div>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(message.choices).map(([choiceKey, choiceText]) => (
                            <Button
                              key={choiceKey}
                              variant={message.selectedChoice === choiceKey ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleChoiceSelect(message.id, choiceKey)}
                              className="justify-start text-left h-auto p-3"
                            >
                              <div>
                                <div className="font-medium text-xs text-muted-foreground mb-1">
                                  {choiceKey.replace('_', ' ').toUpperCase()}
                                </div>
                                <div className="text-sm">{choiceText}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
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
                placeholder={selectedAgent ? "Type your message..." : "Select an agent first..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!selectedAgent}
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!selectedAgent}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}