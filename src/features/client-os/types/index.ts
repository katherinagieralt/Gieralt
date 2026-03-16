import { Timestamp } from "firebase/firestore";

export interface UserPreferences {
  clientOSMode: 'focus' | 'pro';
  dismissedLearningCards: string[];
  aiNarratorEnabled: boolean;
}

export interface ActivityLog {
  id?: string;
  timestamp: Timestamp;
  actor: 'client' | 'admin' | 'system';
  action: 'message' | 'approval' | 'revision_request' | 'milestone_complete';
  payload: Record<string, any>;
  isPrivate: boolean; // If true, excluded from Triple Doc
}

export interface ScopeItem {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  category: 'design' | 'development' | 'content';
}

export interface ScopeProposal {
  id: string;
  proposedBy: 'client' | 'admin';
  items: ScopeItem[];
  priceImpact: number;
  timelineImpact: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
}

export interface MicroLearning {
  id?: string;
  triggerEvent: string;
  title: string;
  content: string; // Markdown
  videoUrl?: string;
  estimatedReadTime: number; // minutes
}
