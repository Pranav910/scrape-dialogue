import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Bot, Clock, Database, Play, Pause, Settings } from "lucide-react"
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

const mockTasks = [
  {
    id: '1',
    agentId: 'agent-1',
    name: 'E-commerce Product Scraper',
    status: 'running',
    progress: 75,
    website: 'amazon.com',
    recordsCollected: 1250,
    lastUpdate: '2 minutes ago'
  },
  {
    id: '2',
    agentId: 'agent-2',
    name: 'News Article Collector',
    status: 'completed',
    progress: 100,
    website: 'news-site.com',
    recordsCollected: 543,
    lastUpdate: '1 hour ago'
  },
  {
    id: '3',
    agentId: 'agent-3',
    name: 'Social Media Monitor',
    status: 'paused',
    progress: 45,
    website: 'twitter.com',
    recordsCollected: 892,
    lastUpdate: '30 minutes ago'
  }
]

export function Dashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-success'
      case 'active': return 'bg-success'
      case 'completed': return 'bg-info'
      case 'paused': return 'bg-warning'
      case 'idle': return 'bg-muted'
      case 'error': return 'bg-destructive'
      default: return 'bg-muted'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your AI agents and their current activities</p>
      </div>

      {/* Agent Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgents.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockAgents.filter(a => a.status === 'active').length} active, {mockAgents.filter(a => a.status === 'idle').length} idle
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Tasks</CardTitle>
            <Activity className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTasks.filter(t => t.status === 'running').length}</div>
            <p className="text-xs text-muted-foreground">
              {mockTasks.filter(t => t.status === 'completed').length} completed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Collected</CardTitle>
            <Database className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTasks.reduce((sum, task) => sum + task.recordsCollected, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <Settings className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockAgents.reduce((sum, agent) => sum + agent.successRate, 0) / mockAgents.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all agents</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Agents</CardTitle>
            <CardDescription>Your available scraping agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    agent.status === 'active' ? 'bg-success animate-pulse' : 
                    agent.status === 'idle' ? 'bg-muted' : 'bg-destructive'
                  }`} />
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-sm text-muted-foreground">{agent.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                    {agent.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {agent.successRate}% success
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Running Tasks</CardTitle>
            <CardDescription>Currently active scraping operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTasks.map((task) => (
              <div key={task.id} className="space-y-3 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                    <span className="font-medium">{task.name}</span>
                  </div>
                  <Badge variant={
                    task.status === 'running' ? 'default' :
                    task.status === 'completed' ? 'secondary' :
                    'outline'
                  }>
                    {task.status}
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div>Target: {task.website}</div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.lastUpdate}
                    </span>
                    <span>{task.recordsCollected} records</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="w-full" />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 px-2">
                    {task.status === 'running' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-2">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">2 min ago</span>
              <span>E-commerce Scraper collected 50 new product records</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-info" />
              <span className="text-muted-foreground">15 min ago</span>
              <span>News Crawler completed daily news aggregation</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-muted-foreground">1 hour ago</span>
              <span>Social Media Monitor was paused by user</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">2 hours ago</span>
              <span>E-commerce Scraper started new product discovery task</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}