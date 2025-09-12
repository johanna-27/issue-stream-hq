import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalyticsData } from "@/data/mockData";
import { Users, Clock, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

export default function Departments() {
  const { departmentStats } = mockAnalyticsData;

  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return "text-success";
    if (rate >= 60) return "text-warning"; 
    return "text-urgent";
  };

  const getPerformanceIcon = (rate: number) => {
    if (rate >= 80) return <TrendingUp className="w-4 h-4 text-success" />;
    if (rate >= 60) return <Clock className="w-4 h-4 text-warning" />; 
    return <TrendingDown className="w-4 h-4 text-urgent" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
        <p className="text-muted-foreground">Monitor department performance and workload distribution</p>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departmentStats.map((dept) => {
          const successRate = (dept.resolved / dept.totalIssues) * 100;
          return (
            <Card key={dept.name} className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {dept.name}
                  </div>
                  {getPerformanceIcon(successRate)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">{dept.totalIssues}</div>
                    <div className="text-xs text-muted-foreground">Total Issues</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{dept.resolved}</div>
                    <div className="text-xs text-muted-foreground">Resolved</div>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{dept.pending}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className={`font-medium ${getPerformanceColor(successRate)}`}>
                      {successRate.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Response Time</span>
                    <span className="font-medium">{dept.avgResponseTime}h</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Resolution Time</span>
                    <span className="font-medium">{dept.avgResolutionTime}h</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{successRate.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          successRate >= 80 ? 'bg-success' :
                          successRate >= 60 ? 'bg-warning' : 'bg-urgent'
                        }`}
                        style={{ width: `${Math.min(successRate, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      successRate >= 80 ? 'bg-success animate-pulse' :
                      successRate >= 60 ? 'bg-warning' : 'bg-urgent animate-pulse'
                    }`}></div>
                    <span className="text-muted-foreground">
                      {successRate >= 80 ? 'Excellent' :
                       successRate >= 60 ? 'Good' : 'Needs Attention'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last updated: Today
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Departments</p>
                <p className="text-2xl font-bold">{departmentStats.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold">
                  {(departmentStats.reduce((sum, d) => sum + d.avgResponseTime, 0) / departmentStats.length).toFixed(1)}h
                </p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Best Performer</p>
                <p className="text-lg font-bold text-success">
                  {departmentStats.reduce((best, current) => 
                    (current.resolved / current.totalIssues) > (best.resolved / best.totalIssues) ? current : best
                  ).name}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Needs Attention</p>
                <p className="text-lg font-bold text-urgent">
                  {departmentStats.filter(d => (d.resolved / d.totalIssues) < 0.6).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-urgent/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Department Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {departmentStats
              .sort((a, b) => (b.resolved / b.totalIssues) - (a.resolved / a.totalIssues))
              .map((dept, index) => {
                const successRate = (dept.resolved / dept.totalIssues) * 100;
                return (
                  <div key={dept.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-success text-success-foreground' :
                        index === 1 ? 'bg-warning text-warning-foreground' :
                        index === 2 ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {dept.resolved}/{dept.totalIssues} resolved
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getPerformanceColor(successRate)}`}>
                        {successRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {dept.avgResolutionTime}h avg
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}