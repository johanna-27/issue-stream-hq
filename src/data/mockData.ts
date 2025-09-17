export interface CivicIssue {
  id: string;
  title: string;
  type: 'pothole' | 'streetlight' | 'garbage' | 'water' | 'traffic' | 'noise' | 'other';
  location: string;
  ward: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  department: string[];
  reportedDate: string;
  deadline: string;
  description: string;
  coordinates: [number, number];
  reportedBy: string;
  assignedTo?: string;
  resolvedDate?: string;
  satisfactionRating?: number;
  estimatedCost?: number;
}

export interface DepartmentStats {
  name: string;
  totalIssues: number;
  resolved: number;
  pending: number;
  avgResponseTime: number;
  avgResolutionTime: number;
}

export interface AnalyticsData {
  totalIssues: number;
  resolvedIssues: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  satisfactionScore: number;
  monthlyTrends: {
    month: string;
    reported: number;
    resolved: number;
  }[];
  departmentStats: DepartmentStats[];
  urgencyBreakdown: {
    urgency: 'low' | 'medium' | 'high' | 'critical';
    count: number;
  }[];
  typeBreakdown: {
    type: 'pothole' | 'streetlight' | 'garbage' | 'water' | 'traffic' | 'noise' | 'other';
    count: number;
  }[];
}

// ✅ Mock civic issues data (Mumbai)
export const mockCivicIssues: CivicIssue[] = [
  {
    id: "CIV-001",
    title: "Large Pothole near Dadar Station",
    type: "pothole",
    location: "Dadar, Mumbai",
    ward: "Ward 1",
    urgency: "high",
    status: "assigned",
    department: ["Public Works", "Transportation"],
    reportedDate: "2024-01-15",
    deadline: "2024-01-22",
    description: "Deep pothole causing vehicle damage, approx 3ft diameter",
    coordinates: [19.0176, 72.8562], // ✅ Dadar
    reportedBy: "citizen_001",
    assignedTo: "John Smith - Public Works",
    estimatedCost: 1500,
  },
  {
    id: "CIV-002",
    title: "Broken Street Light",
    type: "streetlight",
    location: "Andheri East, Mumbai",
    ward: "Ward 2",
    urgency: "medium",
    status: "in-progress",
    department: ["Electrical"],
    reportedDate: "2024-01-10",
    deadline: "2024-01-20",
    description: "Street light flickering and completely out during night hours",
    coordinates: [19.1197, 72.8468], // ✅ Andheri
    reportedBy: "citizen_002",
    assignedTo: "Maria Garcia - Electrical Dept",
    estimatedCost: 800,
  },
  {
    id: "CIV-003",
    title: "Illegal Garbage Dumping",
    type: "garbage",
    location: "Bandra West, Mumbai",
    ward: "Ward 3",
    urgency: "critical",
    status: "reported",
    department: ["Sanitation", "Parks"],
    reportedDate: "2024-01-18",
    deadline: "2024-01-19",
    description: "Large amount of construction debris dumped illegally",
    coordinates: [19.0600, 72.8300], // ✅ Bandra
    reportedBy: "citizen_003",
    estimatedCost: 2500,
  },
  {
    id: "CIV-004",
    title: "Water Main Leak",
    type: "water",
    location: "Marine Lines, Mumbai",
    ward: "Ward 4",
    urgency: "critical",
    status: "resolved",
    department: ["Water Department"],
    reportedDate: "2024-01-05",
    deadline: "2024-01-06",
    resolvedDate: "2024-01-06",
    description: "Active water main break flooding intersection",
    coordinates: [18.9430, 72.8238], // ✅ Marine Lines
    reportedBy: "citizen_004",
    assignedTo: "Emergency Response Team",
    satisfactionRating: 5,
    estimatedCost: 15000,
  },
  {
    id: "CIV-005",
    title: "Traffic Signal Malfunction",
    type: "traffic",
    location: "Powai, Mumbai",
    ward: "Ward 5",
    urgency: "high",
    status: "resolved",
    department: ["Transportation", "Electrical"],
    reportedDate: "2024-01-12",
    deadline: "2024-01-14",
    resolvedDate: "2024-01-13",
    description: "Traffic light stuck on red in all directions",
    coordinates: [19.1170, 72.9060], // ✅ Powai
    reportedBy: "citizen_005",
    assignedTo: "Traffic Control Unit",
    satisfactionRating: 4,
    estimatedCost: 3200,
  },
];

// ✅ Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  totalIssues: 247,
  resolvedIssues: 189,
  avgResponseTime: 4.2,
  avgResolutionTime: 18.5,
  satisfactionScore: 4.1,
  monthlyTrends: [
    { month: "Jul", reported: 45, resolved: 42 },
    { month: "Aug", reported: 52, resolved: 48 },
    { month: "Sep", reported: 48, resolved: 51 },
    { month: "Oct", reported: 38, resolved: 35 },
    { month: "Nov", reported: 41, resolved: 39 },
    { month: "Dec", reported: 23, resolved: 28 },
  ],
  departmentStats: [
    {
      name: "Public Works",
      totalIssues: 89,
      resolved: 72,
      pending: 17,
      avgResponseTime: 3.8,
      avgResolutionTime: 16.2,
    },
    {
      name: "Transportation",
      totalIssues: 54,
      resolved: 47,
      pending: 7,
      avgResponseTime: 2.1,
      avgResolutionTime: 12.4,
    },
    {
      name: "Sanitation",
      totalIssues: 67,
      resolved: 51,
      pending: 16,
      avgResponseTime: 6.2,
      avgResolutionTime: 24.1,
    },
    {
      name: "Water Department",
      totalIssues: 37,
      resolved: 31,
      pending: 6,
      avgResponseTime: 1.8,
      avgResolutionTime: 8.9,
    },
  ],
  urgencyBreakdown: [
    { urgency: "critical", count: 23 },
    { urgency: "high", count: 67 },
    { urgency: "medium", count: 89 },
    { urgency: "low", count: 68 },
  ],
  typeBreakdown: [
    { type: "pothole", count: 78 },
    { type: "streetlight", count: 45 },
    { type: "garbage", count: 52 },
    { type: "water", count: 34 },
    { type: "traffic", count: 28 },
    { type: "other", count: 10 },
  ],
};
