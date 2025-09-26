// src/types.ts

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
