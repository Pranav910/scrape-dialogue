export interface Agent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error'
  description: string
  totalMessages: number
  successRate: number
  lastActive: string
}

export interface AgentMessage {
  message: {
    role: 'user' | 'ai_agent'
    type: 'text' | 'multiple_choice'
    content: string | MultipleChoiceContent
  }
}

export interface MultipleChoiceContent {
  [key: string]: string // choice_1: context, choice_2: context, etc.
}

export interface ConversationMessage {
  id: string
  agentId: string
  type: 'user' | 'agent'
  content: string
  choices?: MultipleChoiceContent
  selectedChoice?: string
  timestamp: string
}