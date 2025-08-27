import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Cell } from "recharts"
import { TrendingUp, TrendingDown, Clock, Target, Zap, AlertCircle } from "lucide-react"

const performanceData = [
  { name: 'Mon', success: 85, failed: 15, records: 1200 },
  { name: 'Tue', success: 92, failed: 8, records: 1450 },
  { name: 'Wed', success: 78, failed: 22, records: 980 },
  { name: 'Thu', success: 88, failed: 12, records: 1320 },
  { name: 'Fri', success: 95, failed: 5, records: 1600 },
  { name: 'Sat', success: 82, failed: 18, records: 1100 },
  { name: 'Sun', success: 90, failed: 10, records: 1380 }
]

const agentMetrics = [
  {
    name: "E-commerce Scraper",
    successRate: 94,
    avgTime: "2.3m",
    recordsPerHour: 450,
    status: "excellent",
    totalRecords: 12500,
    uptime: 98.5
  },
  {
    name: "Social Media Monitor",
    successRate: 87,
    avgTime: "1.8m",
    recordsPerHour: 320,
    status: "good",
    totalRecords: 8900,
    uptime: 96.2
  },
  {
    name: "News Aggregator",
    successRate: 72,
    avgTime: "4.1m",
    recordsPerHour: 180,
    status: "needs-attention",
    totalRecords: 3200,
    uptime: 89.1
  }
]

const colors = {
  excellent: "hsl(var(--success))",
  good: "hsl(var(--info))",
  "needs-attention": "hsl(var(--warning))"
}

export function Metrics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agent Metrics</h1>
        <p className="text-muted-foreground">Performance analytics and insights for your AI agents</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">89%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.7m</div>
            <p className="text-xs text-muted-foreground">-0.3m from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records/Hour</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">316</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Zap className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.2%</div>
            <p className="text-xs text-muted-foreground">+0.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance Trends</CardTitle>
          <CardDescription>Success rates and record collection over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="success" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Success Rate (%)"
              />
              <Line 
                type="monotone" 
                dataKey="records" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Records Collected"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Agent Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance Breakdown</CardTitle>
          <CardDescription>Detailed metrics for each AI agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {agentMetrics.map((agent, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <Badge 
                      variant={agent.status === "excellent" ? "default" : 
                              agent.status === "good" ? "secondary" : "destructive"}
                    >
                      {agent.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  {agent.status === "needs-attention" && (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-lg font-semibold">{agent.successRate}%</div>
                    <Progress value={agent.successRate} className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Avg Time</div>
                    <div className="text-lg font-semibold">{agent.avgTime}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Records/Hour</div>
                    <div className="text-lg font-semibold">{agent.recordsPerHour}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Total Records</div>
                    <div className="text-lg font-semibold">{agent.totalRecords.toLocaleString()}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="text-lg font-semibold">{agent.uptime}%</div>
                    <Progress value={agent.uptime} className="w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Success Rate Comparison</CardTitle>
          <CardDescription>Performance comparison across all agents</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={agentMetrics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="successRate" name="Success Rate (%)">
                {agentMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}