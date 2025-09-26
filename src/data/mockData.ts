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
  beforeImage?: string;
  afterImage?: string;
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
    id: "CIV-JH-001",
    title: "Pothole near Ranchi Main Road",
    type: "pothole",
    location: "Ranchi, Jharkhand",
    ward: "Ward 1",
    urgency: "high",
    status: "reported",
    department: ["Public Works"],
    reportedDate: "2024-02-01",
    deadline: "2024-02-08",
    description: "Deep pothole disrupting traffic near Ranchi Main Road.",
    coordinates: [23.3441, 85.3096],
    reportedBy: "citizen_101",
    estimatedCost: 2500,
    beforeImage: "/images/11.jpg",
    afterImage: ""
  },
  {
    id: "CIV-JH-002",
    title: "Broken Streetlight near Jamshedpur Market",
    type: "streetlight",
    location: "Jamshedpur, Jharkhand",
    ward: "Ward 2",
    urgency: "medium",
    status: "in-progress",
    department: ["Electrical"],
    reportedDate: "2024-02-03",
    deadline: "2024-02-10",
    description: "Streetlight not working at busy crossing near the market.",
    coordinates: [22.8046, 86.2029],
    reportedBy: "citizen_102",
    assignedTo: "Anil Kumar - Electrical Dept",
    estimatedCost: 1200,
    beforeImage: "/images/12.png",
    afterImage: "/images/CIV-JH-002-after.jpg"
  },
  {
    id: "CIV-JH-003",
    title: "Garbage Dump Near Dhanbad Station",
    type: "garbage",
    location: "Dhanbad, Jharkhand",
    ward: "Ward 5",
    urgency: "critical",
    status: "assigned",
    department: ["Sanitation"],
    reportedDate: "2024-02-05",
    deadline: "2024-02-12",
    description: "Large garbage pile near station causing foul smell and health risk.",
    coordinates: [23.7957, 86.4304],
    reportedBy: "citizen_103",
    assignedTo: "Rajesh Singh - Sanitation Dept",
    beforeImage: "/images/13.png",
    afterImage: ""
  },
  {
    id: "CIV-JH-004",
    title: "Water Leakage in Bokaro Colony",
    type: "water",
    location: "Bokaro Steel City, Jharkhand",
    ward: "Ward 7",
    urgency: "high",
    status: "in-progress",
    department: ["Water Department"],
    reportedDate: "2024-02-07",
    deadline: "2024-02-15",
    description: "Continuous water leakage damaging roads in Bokaro colony.",
    coordinates: [23.6693, 86.1511],
    reportedBy: "citizen_104",
    estimatedCost: 5000,
    beforeImage: "/images/14.png",
    afterImage: ""
  },
  {
    id: "CIV-JH-005",
    title: "Traffic Signal Malfunction at Hazaribagh Chowk",
    type: "traffic",
    location: "Hazaribagh, Jharkhand",
    ward: "Ward 9",
    urgency: "medium",
    status: "reported",
    department: ["Transportation"],
    reportedDate: "2024-02-09",
    deadline: "2024-02-16",
    description: "Traffic signal not working leading to frequent traffic jams.",
    coordinates: [23.9966, 85.3691],
    reportedBy: "citizen_105",
    beforeImage: "/images/15.png",
    afterImage: ""
  },
  {
    id: "CIV-JH-006",
    title: "Broken Drainage Cover in Giridih",
    type: "other",
    location: "Giridih, Jharkhand",
    ward: "Ward 14",
    urgency: "medium",
    status: "reported",
    department: ["Public Works"],
    reportedDate: "2024-02-09",
    deadline: "2024-02-16",
    description: "Open drainage cover posing danger to pedestrians.",
    coordinates: [24.1840, 86.3079],
    reportedBy: "citizen_107",
    beforeImage: "/images/16.png",
    afterImage: ""
  },
  
  {
  id: "CIV-JH-007",
  title: "Collapsed Tree Blocking Road in Ranchi",
  type: "obstruction",
  location: "Ranchi, Jharkhand",
  ward: "Ward 11",
  urgency: "high",
  status: "resolved",
  department: ["Disaster Management"],
  reportedDate: "2024-02-18",
  deadline: "2024-02-20",
  description: "Tree uprooted due to storm, blocking traffic movement.",
  coordinates: [23.3600, 85.3250],
  reportedBy: "citizen_108",
  assignedTo: "Prakash Mehta - Disaster Dept",
  estimatedCost: 3000,
  beforeImage: "/images/17.png",
  afterImage: "/images/19.png"
},

{
  id: "CIV-JH-008",
  title: "Overflowing Drain Near Jharia Market",
  type: "drainage",
  location: "Jharia, Jharkhand",
  ward: "Ward 6",
  urgency: "critical",
  status: "in-progress",
  department: ["Sanitation"],
  reportedDate: "2024-02-19",
  deadline: "2024-02-26",
  description: "Overflowing drain causing waterlogging and health hazards.",
  coordinates: [23.7400, 86.4100],
  reportedBy: "citizen_109",
  assignedTo: "Rita Sharma - Sanitation Dept",
  estimatedCost: 4500,
  beforeImage: "/images/18.png",
  afterImage: ""
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
