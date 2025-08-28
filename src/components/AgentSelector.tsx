import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bot, Activity } from "lucide-react"

interface Agent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error'
  description: string
}

interface AgentSelectorProps {
  agents: Agent[]
  selectedAgent: string | null
  onAgentSelect: (agentId: string) => void
}

export function AgentSelector({ agents, selectedAgent, onAgentSelect }: AgentSelectorProps) {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-success'
      case 'idle': return 'bg-muted'
      case 'error': return 'bg-destructive'
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4" />
        <span className="text-sm font-medium">Select Agent</span>
      </div>
      
      <Select value={selectedAgent || ''} onValueChange={onAgentSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an AI agent..." />
        </SelectTrigger>
        <SelectContent>
          {agents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  <span className="font-medium">{agent.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {agent.status}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedAgent && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-3 w-3" />
            <span className="text-xs font-medium">Current Agent</span>
          </div>
          {agents.find(a => a.id === selectedAgent) && (
            <p className="text-sm text-muted-foreground">
              {agents.find(a => a.id === selectedAgent)?.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}