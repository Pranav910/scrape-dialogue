import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle, Target, Bot } from "lucide-react"
import { AgentSelector } from "./AgentSelector"
import { Agent } from "@/types/agent"

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

const getAgentPerformanceData = (agentId: string) => {
  const baseData = [
    { name: 'Week 1', success: 85, failed: 15 },
    { name: 'Week 2', success: 92, failed: 8 },
    { name: 'Week 3', success: 78, failed: 22 },
    { name: 'Week 4', success: 94, failed: 6 },
  ]
  
  // Vary data slightly per agent
  const variation = agentId === 'agent-1' ? 5 : agentId === 'agent-2' ? -3 : 2
  return baseData.map(d => ({
    ...d,
    success: Math.max(0, Math.min(100, d.success + variation)),
    failed: Math.max(0, Math.min(100, d.failed - variation))
  }))
}

const getAgentResponseTimeData = (agentId: string) => {
  const baseData = [
    { name: 'Mon', time: 1.2 },
    { name: 'Tue', time: 0.8 },
    { name: 'Wed', time: 1.5 },
    { name: 'Thu', time: 0.9 },
    { name: 'Fri', time: 1.1 },
    { name: 'Sat', time: 0.7 },
    { name: 'Sun', time: 0.6 },
  ]
  
  const multiplier = agentId === 'agent-1' ? 0.8 : agentId === 'agent-2' ? 1.2 : 1.0
  return baseData.map(d => ({
    ...d,
    time: Math.round((d.time * multiplier) * 10) / 10
  }))
}

const taskDistribution = [
  { name: 'Web Scraping', value: 45, color: '#8b5cf6' },
  { name: 'Data Processing', value: 30, color: '#06b6d4' },
  { name: 'Analysis', value: 15, color: '#10b981' },
  { name: 'Reporting', value: 10, color: '#f59e0b' },
]

export function Metrics() {
  const [selectedAgent, setSelectedAgent] = useState<string>('agent-1')
  
  const currentAgent = mockAgents.find(a => a.id === selectedAgent)
  const performanceData = getAgentPerformanceData(selectedAgent)
  const responseTimeData = getAgentResponseTimeData(selectedAgent)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Metrics</h1>
        <p className="text-muted-foreground">Monitor your AI agents' performance and efficiency</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Select Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AgentSelector 
              agents={mockAgents}
              selectedAgent={selectedAgent}
              onAgentSelect={setSelectedAgent}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Agent Overview</CardTitle>
            <CardDescription>
              {currentAgent ? `Performance metrics for ${currentAgent.name}` : 'Select an agent'}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Messages</p>
              <p className="text-2xl font-bold">{currentAgent?.totalMessages || 0}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{currentAgent?.successRate || 0}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Last Active</p>
              <p className="text-sm font-medium">{currentAgent?.lastActive || 'Unknown'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics for Selected Agent */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentAgent?.successRate || 0}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +2.1% from last month
            </div>
            <Progress value={currentAgent?.successRate || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedAgent === 'agent-1' ? '0.6s' : selectedAgent === 'agent-2' ? '1.0s' : '0.8s'}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-success" />
              -0.2s faster
            </div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentAgent?.totalMessages || 0}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-warning" />
              +12 new messages today
            </div>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(100 - (currentAgent?.successRate || 0)).toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-success" />
              -1.2% improvement
            </div>
            <Progress value={100 - (currentAgent?.successRate || 0)} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Success and failure rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="hsl(var(--success))" name="Success %" />
                <Bar dataKey="failed" fill="hsl(var(--destructive))" name="Failed %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
            <CardDescription>Average response time over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Response Time (s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Task Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Task Distribution</CardTitle>
          <CardDescription>Breakdown of agent activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={taskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {taskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}