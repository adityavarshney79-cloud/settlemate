/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 
  | 'Home Buyer' 
  | 'Mortgage Adviser' 
  | 'Property Lawyer' 
  | 'Real Estate Agent' 
  | 'Super Admin';

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  avatarUrl?: string;
  profileCompleted: boolean;
  buyerDetails?: BuyerProfile;
}

export interface BuyerProfile {
  budget: number;
  desiredLocation: string;
  propertyType: string;
  mortgagePreApproved?: boolean;
  hasLawyerAssigned?: boolean;
  preferredTimeline: string;
}

export type QueryStatus = 'Pending' | 'In Progress' | 'Action Required' | 'Approved' | 'Completed' | 'Rejected';

export interface PropertyQuery {
  id: string;
  buyerId: string;
  buyerName: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  status: QueryStatus;
  createdAt: string;
  
  // Role-Specific Sections
  mortgageNotes?: string;
  mortgageStatus?: 'Awaiting Assessment' | 'Documents Requested' | 'Offer Issued' | 'Rejected';
  mortgageAdviserId?: string;
  
  legalNotes?: string;
  legalStatus?: 'Title Deed Search' | 'Contract Review' | 'Exchange Pending' | 'Completed';
  lawyerId?: string;
  
  conciergeNotes?: string;
  conciergeStatus?: 'Searching Properties' | 'Viewings Scheduled' | 'Offer Negotiations' | 'Settled';
  conciergeId?: string;

  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  updatedAt: string;
  updatedBy: string; // User Name
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  targetUserId?: string;
  targetQueryId?: string;
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  recipientRole?: UserRole; // Broadcast to a specific role
  recipientId?: string;     // Or target to a specific user ID
  senderName: string;
  senderRole: UserRole;
  title: string;
  message: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export type DocumentCategory = 
  | 'Mortgage'
  | 'Legal'
  | 'Insurance'
  | 'Utilities'
  | 'Inspection'
  | 'Receipts'
  | 'Bank Statement' 
  | 'Tax Return / W-2' 
  | 'Proof of ID / Passport' 
  | 'Property Valuation' 
  | 'Purchase Contract' 
  | 'Other Legal Paper';

export interface SharedDocument {
  id: string;
  queryId?: string;
  buyerId: string;
  buyerName: string;
  fileName: string;
  fileCategory: DocumentCategory;
  fileSize: string;
  uploadDate: string;
  sharedWith: ('All Team' | UserRole)[];
  status: 'Shared' | 'Under Review' | 'Verified' | 'Requires Update';
  notes?: string;
  downloadUrl?: string;
}
