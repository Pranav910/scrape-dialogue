import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Bot, Clock, CheckCircle } from "lucide-react"

const runningAgents = [
  {
    id: 1,
    name: "E-commerce Scraper",
    status: "running",
    progress: 75,
    recordsCollected: 1250,
    startTime: "2 hours ago",
    website: "example-store.com"
  },
  {
    id: 2,
    name: "Social Media Monitor",
    status: "completed",
    progress: 100,
    recordsCollected: 850,
    startTime: "4 hours ago",
    website: "social-platform.com"
  },
  {
    id: 3,
    name: "News Aggregator",
    status: "running",
    progress: 45,
    recordsCollected: 320,
    startTime: "30 minutes ago",
    website: "news-site.com"
  }
]

export function Dashboard() {
  const totalAgents = runningAgents.length
  const runningCount = runningAgents.filter(agent => agent.status === "running").length
  const completedCount = runningAgents.filter(agent => agent.status === "completed").length
  const totalRecords = runningAgents.reduce((sum, agent) => sum + agent.recordsCollected, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your AI agents and their performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{runningCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{completedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records Collected</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Running Agents */}
      <Card>
        <CardHeader>
          <CardTitle>Active Agents</CardTitle>
          <CardDescription>Currently running and recently completed agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {runningAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{agent.name}</h3>
                    <Badge variant={agent.status === "running" ? "default" : "secondary"}>
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>Target: {agent.website}</div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Started {agent.startTime}
                      </span>
                      <span>{agent.recordsCollected} records collected</span>
                    </div>
                  </div>
                </div>
                <div className="w-32 space-y-2">
                  <div className="text-right text-sm font-medium">{agent.progress}%</div>
                  <Progress value={agent.progress} className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}