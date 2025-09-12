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
    urgency: string;
    count: number;
  }[];
  typeBreakdown: {
    type: string;
    count: number;
  }[];
}

// Mock civic issues data
export const mockCivicIssues: CivicIssue[] = [
  {
    id: "CIV-001",
    title: "Large Pothole on Main Street",
    type: "pothole",
    location: "Main Street & 1st Ave",
    ward: "Ward 1",
    urgency: "high",
    status: "assigned",
    department: ["Public Works", "Transportation"],
    reportedDate: "2024-01-15",
    deadline: "2024-01-22",
    description: "Deep pothole causing vehicle damage, approximately 3ft diameter",
    coordinates: [40.7589, -73.9851],
    reportedBy: "citizen_001",
    assignedTo: "John Smith - Public Works",
    estimatedCost: 1500
  },
  {
    id: "CIV-002", 
    title: "Broken Street Light",
    type: "streetlight",
    location: "Park Avenue & 3rd Street",
    ward: "Ward 2",
    urgency: "medium",
    status: "in-progress",
    department: ["Electrical"],
    reportedDate: "2024-01-10",
    deadline: "2024-01-20",
    description: "Street light flickering and completely out during night hours",
    coordinates: [40.7614, -73.9776],
    reportedBy: "citizen_002",
    assignedTo: "Maria Garcia - Electrical Dept",
    estimatedCost: 800
  },
  {
    id: "CIV-003",
    title: "Illegal Garbage Dumping",
    type: "garbage", 
    location: "Riverside Park North Entrance",
    ward: "Ward 3",
    urgency: "critical",
    status: "reported",
    department: ["Sanitation", "Parks"],
    reportedDate: "2024-01-18",
    deadline: "2024-01-19",
    description: "Large amount of construction debris dumped illegally",
    coordinates: [40.7505, -73.9934],
    reportedBy: "citizen_003",
    estimatedCost: 2500
  },
  {
    id: "CIV-004",
    title: "Water Main Leak",
    type: "water",
    location: "Broadway & 5th Avenue", 
    ward: "Ward 1",
    urgency: "critical",
    status: "resolved",
    department: ["Water Department"],
    reportedDate: "2024-01-05",
    deadline: "2024-01-06",
    resolvedDate: "2024-01-06",
    description: "Active water main break flooding intersection",
    coordinates: [40.7831, -73.9712],
    reportedBy: "citizen_004",
    assignedTo: "Emergency Response Team",
    satisfactionRating: 5,
    estimatedCost: 15000
  },
  {
    id: "CIV-005",
    title: "Traffic Signal Malfunction",
    type: "traffic",
    location: "Central Ave & Oak Street",
    ward: "Ward 2", 
    urgency: "high",
    status: "resolved",
    department: ["Transportation", "Electrical"],
    reportedDate: "2024-01-12",
    deadline: "2024-01-14",
    resolvedDate: "2024-01-13",
    description: "Traffic light stuck on red in all directions",
    coordinates: [40.7282, -73.9942], 
    reportedBy: "citizen_005",
    assignedTo: "Traffic Control Unit",
    satisfactionRating: 4,
    estimatedCost: 3200
  }
];

// Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  totalIssues: 247,
  resolvedIssues: 189,
  avgResponseTime: 4.2, // hours
  avgResolutionTime: 18.5, // hours
  satisfactionScore: 4.1,
  monthlyTrends: [
    { month: "Jul", reported: 45, resolved: 42 },
    { month: "Aug", reported: 52, resolved: 48 },
    { month: "Sep", reported: 48, resolved: 51 },
    { month: "Oct", reported: 38, resolved: 35 },
    { month: "Nov", reported: 41, resolved: 39 },
    { month: "Dec", reported: 23, resolved: 28 }
  ],
  departmentStats: [
    {
      name: "Public Works",
      totalIssues: 89,
      resolved: 72,
      pending: 17,
      avgResponseTime: 3.8,
      avgResolutionTime: 16.2
    },
    {
      name: "Transportation", 
      totalIssues: 54,
      resolved: 47,
      pending: 7,
      avgResponseTime: 2.1,
      avgResolutionTime: 12.4
    },
    {
      name: "Sanitation",
      totalIssues: 67,
      resolved: 51,
      pending: 16,
      avgResponseTime: 6.2,
      avgResolutionTime: 24.1
    },
    {
      name: "Water Department",
      totalIssues: 37,
      resolved: 31,
      pending: 6,
      avgResponseTime: 1.8,
      avgResolutionTime: 8.9
    }
  ],
  urgencyBreakdown: [
    { urgency: "Critical", count: 23 },
    { urgency: "High", count: 67 },
    { urgency: "Medium", count: 89 },
    { urgency: "Low", count: 68 }
  ],
  typeBreakdown: [
    { type: "Potholes", count: 78 },
    { type: "Street Lights", count: 45 },
    { type: "Garbage", count: 52 },
    { type: "Water Issues", count: 34 },
    { type: "Traffic", count: 28 },
    { type: "Other", count: 10 }
  ]
};