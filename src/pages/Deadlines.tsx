import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockCivicIssues } from "@/data/mockData";
import { Clock, AlertTriangle, Calendar, MapPin } from "lucide-react";

export default function Deadlines() {
  const now = new Date();
  
  // Calculate deadline statuses
  const overdue = mockCivicIssues.filter(issue => 
    new Date(issue.deadline) < now && !['resolved', 'closed'].includes(issue.status)
  );
  
  const dueSoon = mockCivicIssues.filter(issue => {
    const deadline = new Date(issue.deadline);
    const daysDiff = (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24);
    return daysDiff > 0 && daysDiff <= 3 && !['resolved', 'closed'].includes(issue.status);
  });
  
  const upcoming = mockCivicIssues.filter(issue => {
    const deadline = new Date(issue.deadline);
    const daysDiff = (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24);
    return daysDiff > 3 && daysDiff <= 7 && !['resolved', 'closed'].includes(issue.status);
  });

  const getDaysFromDeadline = (deadline: string) => {
    const daysDiff = Math.floor((new Date(deadline).getTime() - now.getTime()) / (1000 * 3600 * 24));
    if (daysDiff < 0) return `${Math.abs(daysDiff)} days overdue`;
    if (daysDiff === 0) return 'Due today';
    return `${daysDiff} days remaining`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Deadline Management</h1>
        <p className="text-muted-foreground">Track and manage issue deadlines across all departments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-urgent text-urgent-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-urgent-foreground/80 text-sm">Overdue</p>
                <p className="text-2xl font-bold">{overdue.length}</p>
                <p className="text-xs text-urgent-foreground/60">Requires immediate attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-urgent-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground/80 text-sm">Due Soon</p>
                <p className="text-2xl font-bold">{dueSoon.length}</p>
                <p className="text-xs text-warning-foreground/60">Within 3 days</p>
              </div>
              <Clock className="w-8 h-8 text-warning-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Upcoming</p>
                <p className="text-2xl font-bold">{upcoming.length}</p>
                <p className="text-xs text-muted-foreground">Within 7 days</p>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">On Track</p>
                <p className="text-2xl font-bold text-success">
                  {mockCivicIssues.filter(i => ['resolved', 'closed'].includes(i.status)).length}
                </p>
                <p className="text-xs text-success">Resolved on time</p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Issues */}
      {overdue.length > 0 && (
        <Card className="border-urgent/20 bg-urgent/5">
          <CardHeader>
            <CardTitle className="text-urgent flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Overdue Issues ({overdue.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdue.map((issue) => (
                <div key={issue.id} className="p-4 bg-card border border-urgent/20 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{issue.id}</span>
                        <StatusBadge urgency={issue.urgency as any}>{issue.urgency}</StatusBadge>
                        <StatusBadge status={issue.status as any}>{issue.status}</StatusBadge>
                      </div>
                      <h3 className="font-medium text-sm mb-1">{issue.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{issue.location}</span>
                        </div>
                        <span>Dept: {issue.department[0]}</span>
                        {issue.assignedTo && <span>Assigned: {issue.assignedTo}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-urgent">
                        {getDaysFromDeadline(issue.deadline)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due: {new Date(issue.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Due Soon Issues */}
      {dueSoon.length > 0 && (
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="text-warning flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Due Soon ({dueSoon.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dueSoon.map((issue) => (
                <div key={issue.id} className="p-4 bg-card border border-warning/20 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{issue.id}</span>
                        <StatusBadge urgency={issue.urgency as any}>{issue.urgency}</StatusBadge>
                        <StatusBadge status={issue.status as any}>{issue.status}</StatusBadge>
                      </div>
                      <h3 className="font-medium text-sm mb-1">{issue.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{issue.location}</span>
                        </div>
                        <span>Dept: {issue.department[0]}</span>
                        {issue.assignedTo && <span>Assigned: {issue.assignedTo}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-warning">
                        {getDaysFromDeadline(issue.deadline)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due: {new Date(issue.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Deadlines ({upcoming.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcoming.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming deadlines in the next 7 days</p>
              </div>
            ) : (
              upcoming.map((issue) => (
                <div key={issue.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{issue.id}</span>
                        <StatusBadge urgency={issue.urgency as any}>{issue.urgency}</StatusBadge>
                        <StatusBadge status={issue.status as any}>{issue.status}</StatusBadge>
                      </div>
                      <h3 className="font-medium text-sm mb-1">{issue.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{issue.location}</span>
                        </div>
                        <span>Dept: {issue.department[0]}</span>
                        {issue.assignedTo && <span>Assigned: {issue.assignedTo}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {getDaysFromDeadline(issue.deadline)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due: {new Date(issue.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}