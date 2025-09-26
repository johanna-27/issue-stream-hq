import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCivicIssues } from "../data/mockData";
import { Search, Filter, Plus, MapPin, Calendar, Building, X, FileText } from "lucide-react";

// Define CivicIssue type inline since no separate types.ts
export type CivicIssue = (typeof mockCivicIssues)[number];

export default function Issues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [issues, setIssues] = useState<CivicIssue[]>(mockCivicIssues); // ✅ make issues stateful
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);

  // Split issues into active + resolved
  const activeIssues = issues.filter(i => i.status !== "resolved" && i.status !== "closed");
  const resolvedIssues = issues.filter(i => i.status === "resolved");

  // Filter logic (only on active issues)
  const filteredIssues = activeIssues.filter(issue => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesUrgency = urgencyFilter === "all" || issue.urgency === urgencyFilter;
    const matchesType = typeFilter === "all" || issue.type === typeFilter;
    const matchesDept = deptFilter === "all" || issue.department.includes(deptFilter);

    return matchesSearch && matchesStatus && matchesUrgency && matchesType && matchesDept;
  });

  // Unique department list
  const allDepartments = Array.from(new Set(issues.flatMap(i => i.department)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issue Management</h1>
          <p className="text-muted-foreground">Monitor, assign, and track all civic issues</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add New Issue
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Issues</p>
                <p className="text-2xl font-bold">{activeIssues.length}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Open Issues</p>
                <p className="text-2xl font-bold text-yellow-600">{activeIssues.length}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {activeIssues.filter(i => i.urgency === "critical").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{resolvedIssues.length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      {/* (unchanged – keeping your filter UI as is) */}

      {/* Active Issues Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Active Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <Card
              key={issue.id}
              className="cursor-pointer rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:scale-[1.01] transition-transform duration-200"
              onClick={() => setSelectedIssue(issue)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-foreground">{issue.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{issue.location}</p>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="text-gray-600">Status: <span className="font-medium">{issue.status}</span></p>
                <p className="text-gray-600">Urgency:
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium 
                      ${issue.urgency === "critical" ? "bg-red-100 text-red-700" : ""}
                      ${issue.urgency === "high" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${issue.urgency === "medium" ? "bg-blue-100 text-blue-700" : ""}
                      ${issue.urgency === "low" ? "bg-gray-100 text-gray-700" : ""}
                    `}
                  >
                    {issue.urgency}
                  </span>
                </p>
                <p className="text-gray-600">Dept: {issue.department.join(", ")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Resolved Issues Grid */}
      {resolvedIssues.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-10 mb-3">Resolved Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolvedIssues.map((issue) => (
              <Card
                key={issue.id}
                className="cursor-pointer rounded-2xl border border-green-300 bg-green-50 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-transform duration-200"
                onClick={() => setSelectedIssue(issue)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-foreground">{issue.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{issue.location}</p>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p className="text-gray-600">Status: <span className="font-medium text-green-700">{issue.status}</span></p>
                  <p className="text-gray-600">Dept: {issue.department.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-2xl shadow-xl w-full max-w-2xl relative border border-border overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedIssue(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-3">{selectedIssue.title}</h2>
            <p className="mb-4 text-muted-foreground">{selectedIssue.description}</p>

            <div className="space-y-2 text-sm">
              <p><MapPin className="inline w-4 h-4 mr-1 text-muted-foreground" /> {selectedIssue.location} ({selectedIssue.ward})</p>
              <p><Calendar className="inline w-4 h-4 mr-1 text-muted-foreground" /> Reported: {new Date(selectedIssue.reportedDate).toLocaleDateString()}</p>
              <p><Building className="inline w-4 h-4 mr-1 text-muted-foreground" /> Dept: {selectedIssue.department.join(", ")}</p>
              <p>Status: <span className="font-medium">{selectedIssue.status}</span> | Urgency: <span className="font-medium">{selectedIssue.urgency}</span></p>
            </div>

            {/* Map Embed using coordinates */}
            {selectedIssue.coordinates && (
              <div className="mt-6">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${selectedIssue.coordinates[0]},${selectedIssue.coordinates[1]}&output=embed`}
                  className="w-full h-64 rounded-lg border"
                  loading="lazy"
                />
              </div>
            )}

            {selectedIssue.beforeImage && (
              <div className="mt-6">
                <p className="font-semibold mb-2">Before</p>
                <img src={selectedIssue.beforeImage} className="rounded-lg border shadow-md" />
              </div>
            )}
            {selectedIssue.afterImage && (
              <div className="mt-6">
                <p className="font-semibold mb-2">After</p>
                <img src={selectedIssue.afterImage} className="rounded-lg border shadow-md" />
              </div>
            )}

            {/* Mark as Resolved */}
            {selectedIssue.status !== "resolved" && (
              <div className="mt-6 flex justify-end">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setIssues(prev =>
                      prev.map(i => i.id === selectedIssue.id ? { ...i, status: "resolved" } : i)
                    );
                    setSelectedIssue(null); // close modal after updating
                  }}
                >
                  Mark as Resolved
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
