import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { mockAnalyticsData } from "@/data/mockData";
import { TrendingUp, Clock, CheckCircle, Star, AlertCircle } from "lucide-react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Analytics() {
  const { 
    totalIssues, 
    resolvedIssues, 
    avgResponseTime, 
    avgResolutionTime, 
    satisfactionScore,
    monthlyTrends,
    departmentStats,
    urgencyBreakdown,
    typeBreakdown
  } = mockAnalyticsData;

  const resolutionRate = ((resolvedIssues / totalIssues) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Insights and performance metrics for civic issue management</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Issues</p>
                <p className="text-2xl font-bold">{totalIssues}</p>
                <p className="text-xs text-primary-foreground/60">All time</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Resolved</p>
                <p className="text-2xl font-bold">{resolvedIssues}</p>
                <p className="text-xs text-success-foreground/60">{resolutionRate}% success rate</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Response</p>
                <p className="text-2xl font-bold">{avgResponseTime}h</p>
                <p className="text-xs text-success">-15% from last month</p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Resolution</p>
                <p className="text-2xl font-bold">{avgResolutionTime}h</p>
                <p className="text-xs text-warning">+5% from last month</p>
              </div>
              <AlertCircle className="w-8 h-8 text-muted-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Satisfaction</p>
                <p className="text-2xl font-bold">{satisfactionScore}/5</p>
                <p className="text-xs text-success">+0.2 from last month</p>
              </div>
              <Star className="w-8 h-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <defs>
                  <linearGradient id="reported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="resolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="reported" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#reported)"
                  name="Reported"
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="hsl(var(--success))" 
                  fillOpacity={1} 
                  fill="url(#resolved)"
                  name="Resolved"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Types Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {typeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStats} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="resolved" fill="hsl(var(--success))" name="Resolved" />
                <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Urgency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Urgency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={urgencyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="urgency" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-right py-3 px-4 font-medium">Total Issues</th>
                  <th className="text-right py-3 px-4 font-medium">Resolved</th>
                  <th className="text-right py-3 px-4 font-medium">Pending</th>
                  <th className="text-right py-3 px-4 font-medium">Avg Response (hrs)</th>
                  <th className="text-right py-3 px-4 font-medium">Avg Resolution (hrs)</th>
                  <th className="text-right py-3 px-4 font-medium">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept) => (
                  <tr key={dept.name} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="text-right py-3 px-4">{dept.totalIssues}</td>
                    <td className="text-right py-3 px-4 text-success">{dept.resolved}</td>
                    <td className="text-right py-3 px-4 text-warning">{dept.pending}</td>
                    <td className="text-right py-3 px-4">{dept.avgResponseTime}</td>
                    <td className="text-right py-3 px-4">{dept.avgResolutionTime}</td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-medium ${
                        (dept.resolved / dept.totalIssues) > 0.8 ? 'text-success' : 
                        (dept.resolved / dept.totalIssues) > 0.6 ? 'text-warning' : 'text-urgent'
                      }`}>
                        {((dept.resolved / dept.totalIssues) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}