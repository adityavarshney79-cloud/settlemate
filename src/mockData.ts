/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, PropertyQuery, ActivityLog, SystemNotification, SharedDocument, UserRole, Milestone } from './types';

export const INITIAL_DOCUMENTS: SharedDocument[] = [
  {
    id: 'doc-1',
    queryId: 'qry-1',
    buyerId: 'usr-buyer-1',
    buyerName: 'Alex Rivera',
    fileName: 'Alex_Rivera_Passport_Proof_of_ID.pdf',
    fileCategory: 'Proof of ID / Passport',
    fileSize: '1.8 MB',
    uploadDate: '2026-07-10T11:20:00Z',
    sharedWith: ['All Team'],
    status: 'Verified',
    notes: 'Government issued passport verified for identity audit.'
  },
  {
    id: 'doc-2',
    queryId: 'qry-1',
    buyerId: 'usr-buyer-1',
    buyerName: 'Alex Rivera',
    fileName: 'Alex_Rivera_Bank_Statement_2026.pdf',
    fileCategory: 'Bank Statement',
    fileSize: '3.2 MB',
    uploadDate: '2026-07-11T14:05:00Z',
    sharedWith: ['Mortgage Adviser'],
    status: 'Verified',
    notes: 'Shows sufficient proof of deposit funds ($130k liquid).'
  },
  {
    id: 'doc-3',
    queryId: 'qry-1',
    buyerId: 'usr-buyer-1',
    buyerName: 'Alex Rivera',
    fileName: 'Tax_Returns_2024_2025_SelfEmployed.pdf',
    fileCategory: 'Tax Return / W-2',
    fileSize: '4.5 MB',
    uploadDate: '2026-07-12T09:30:00Z',
    sharedWith: ['Mortgage Adviser', 'Super Admin'],
    status: 'Under Review',
    notes: 'Submitted for David Miller to complete self-employed assessment.'
  },
  {
    id: 'doc-4',
    queryId: 'qry-1',
    buyerId: 'usr-buyer-1',
    buyerName: 'Alex Rivera',
    fileName: 'Draft_Purchase_Agreement_Auckland.docx',
    fileCategory: 'Purchase Contract',
    fileSize: '850 KB',
    uploadDate: '2026-07-14T16:45:00Z',
    sharedWith: ['Property Lawyer'],
    status: 'Under Review',
    notes: 'Shared with Elena Rostova for NZ Land Transfer contract clause review.'
  },
  {
    id: 'doc-5',
    queryId: 'qry-1',
    buyerId: 'usr-buyer-1',
    buyerName: 'Alex Rivera',
    fileName: 'Property_Inspection_Remuera_Auckland.pdf',
    fileCategory: 'Property Valuation',
    fileSize: '2.4 MB',
    uploadDate: '2026-07-15T10:15:00Z',
    sharedWith: ['Real Estate Agent', 'All Team'],
    status: 'Shared',
    notes: 'LIM report and building inspection for candidate Auckland residence.'
  }
];

export const DEFAULT_PASSWORDS: Record<string, string> = {
  'admin@hometrack.com': 'Admin@Settle2026',
  'mortgage@hometrack.com': 'Mortgage@Settle2026',
  'lawyer@hometrack.com': 'Lawyer@Settle2026',
  'concierge@hometrack.com': 'Agent@Settle2026',
  'buyer@hometrack.com': 'Buyer@Settle2026',
  'clara@hometrack.com': 'Buyer@Settle2026'
};

export const ROLE_DEFAULT_PASSWORDS: Record<UserRole, string> = {
  'Super Admin': 'Admin@Settle2026',
  'Mortgage Adviser': 'Mortgage@Settle2026',
  'Property Lawyer': 'Lawyer@Settle2026',
  'Real Estate Agent': 'Agent@Settle2026',
  'Home Buyer': 'Buyer@Settle2026'
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    email: 'admin@hometrack.com',
    password: 'Admin@Settle2026',
    name: 'Sarah Jenkins',
    role: 'Super Admin',
    phone: '+1 (555) 019-2834',
    createdAt: '2026-06-01T09:00:00Z',
    profileCompleted: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-mortgage-1',
    email: 'mortgage@hometrack.com',
    password: 'Mortgage@Settle2026',
    name: 'David Miller',
    role: 'Mortgage Adviser',
    phone: '+1 (555) 014-9988',
    createdAt: '2026-06-02T10:30:00Z',
    profileCompleted: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-lawyer-1',
    email: 'lawyer@hometrack.com',
    password: 'Lawyer@Settle2026',
    name: 'Elena Rostova',
    role: 'Property Lawyer',
    phone: '+1 (555) 017-3322',
    createdAt: '2026-06-03T11:15:00Z',
    profileCompleted: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-concierge-1',
    email: 'concierge@hometrack.com',
    password: 'Agent@Settle2026',
    name: 'Marcus Vance',
    role: 'Real Estate Agent',
    phone: '+1 (555) 012-4455',
    createdAt: '2026-06-04T14:20:00Z',
    profileCompleted: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-buyer-1',
    email: 'buyer@hometrack.com',
    password: 'Buyer@Settle2026',
    name: 'Alex Rivera',
    role: 'Home Buyer',
    phone: '+1 (555) 015-8811',
    createdAt: '2026-06-05T16:45:00Z',
    profileCompleted: true,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    buyerDetails: {
      budget: 1650000,
      desiredLocation: 'Remuera, Auckland, NZ',
      propertyType: 'Standalone house',
      mortgagePreApproved: false,
      hasLawyerAssigned: false,
      preferredTimeline: '3-6 Months'
    }
  },
  {
    id: 'usr-buyer-2',
    email: 'clara@hometrack.com',
    password: 'Buyer@Settle2026',
    name: 'Clara Oswald',
    role: 'Home Buyer',
    phone: '+64 21 016 2244',
    createdAt: '2026-06-10T10:15:00Z',
    profileCompleted: true,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    buyerDetails: {
      budget: 1250000,
      desiredLocation: 'Queenstown, NZ',
      propertyType: 'Town house',
      mortgagePreApproved: true,
      hasLawyerAssigned: true,
      preferredTimeline: 'Immediate'
    }
  }
];

export const INITIAL_QUERIES: PropertyQuery[] = [
  {
    id: 'qry-1',
    buyerId: 'usr-buyer-1',
    buyerName: 'Alex Rivera',
    title: 'Architectural Modern Home near Remuera & Parnell',
    description: 'Looking for a 4-bedroom executive family home in Remuera with native garden views and top school zones (Double Grammar Zone).',
    budget: 1650000,
    location: 'Remuera, Auckland, NZ',
    status: 'In Progress',
    createdAt: '2026-06-06T10:00:00Z',
    mortgageNotes: 'Buyer is self-employed. Requiring 2 years of NZ IRD tax filings for assessment.',
    mortgageStatus: 'Documents Requested',
    mortgageAdviserId: 'usr-mortgage-1',
    legalNotes: 'Initial LINZ title search initiated. Preparing Auckland District Law Society ADLS sale agreement review.',
    legalStatus: 'Title Deed Search',
    lawyerId: 'usr-lawyer-1',
    conciergeNotes: 'Matched 3 candidate properties in Remuera & Orakei. Organizing private viewings.',
    conciergeStatus: 'Searching Properties',
    conciergeId: 'usr-concierge-1',
    milestones: [
      { id: 'm-0', title: 'Onboarding & Profile Completed', description: 'Buyer profile set up and primary needs registered', completed: true, updatedAt: '2026-05-30T10:00:00Z', updatedBy: 'System' },
      { id: 'm-1', title: 'Mortgage Advisor Engagement', description: 'Connect with certified mortgage adviser and initiate financial review', completed: true, updatedAt: '2026-06-01T10:00:00Z', updatedBy: 'David Miller' },
      { id: 'm-2', title: 'Documents Uploaded', description: 'Upload proof of income, passport ID, and bank statements to secure vault', completed: true, updatedAt: '2026-06-02T11:30:00Z', updatedBy: 'System' },
      { id: 'm-3', title: 'Pre-Approval Loan', description: 'Mortgage lender issues formal pre-approval letter and rate lock terms', completed: true, updatedAt: '2026-06-05T09:15:00Z', updatedBy: 'David Miller' },
      { id: 'm-4', title: 'Real Estate Agent Match', description: 'Paired with expert local agent to source on-market & off-market homes', completed: false, updatedAt: '2026-06-06T14:00:00Z', updatedBy: 'Marcus Vance' },
      { id: 'm-5', title: 'Offer Accepted', description: 'Property offer submitted, negotiated, and legally accepted by vendor', completed: false, updatedAt: '2026-06-07T10:00:00Z', updatedBy: 'Marcus Vance' },
      { id: 'm-6', title: 'Lawyer Assigned', description: 'Property lawyer assigned for title deeds audit, LIM report & conveyancing', completed: false, updatedAt: '2026-06-08T12:00:00Z', updatedBy: 'Elena Rostova' },
      { id: 'm-7', title: 'Settlement Scheduled', description: 'Final settlement date confirmed, bank drawdown prepared & funds cleared', completed: false, updatedAt: '2026-06-09T09:00:00Z', updatedBy: 'Elena Rostova' },
      { id: 'm-8', title: 'Insurance Completed', description: 'House cover and building insurance policy bound prior to settlement', completed: false, updatedAt: '2026-06-10T11:00:00Z', updatedBy: 'System' },
      { id: 'm-9', title: 'Mover Coordination', description: 'Relocation team booked, packing logistics and key pickup arranged', completed: false, updatedAt: '2026-06-11T15:00:00Z', updatedBy: 'System' },
      { id: 'm-10', title: 'Furnisher & Setup', description: 'Interior styling, furniture delivery, power, fiber internet & utility setup', completed: false, updatedAt: '2026-06-12T10:00:00Z', updatedBy: 'System' },
      { id: 'm-11', title: 'Settle Down', description: 'Keys handed over! Welcome to your new home in New Zealand', completed: false, updatedAt: '2026-06-13T12:00:00Z', updatedBy: 'System' }
    ]
  },
  {
    id: 'qry-2',
    buyerId: 'usr-buyer-2',
    buyerName: 'Clara Oswald',
    title: 'Queenstown Alpine View Residence',
    description: 'Seeking a stylish 3-bed townhouse near Lake Wakatipu. Must have panoramic mountain views and private garage.',
    budget: 1250000,
    location: 'Queenstown, NZ',
    status: 'Action Required',
    createdAt: '2026-06-11T14:30:00Z',
    mortgageNotes: 'Pre-approval verified with NZ lender. Checking rate locks and deposit verification.',
    mortgageStatus: 'Awaiting Assessment',
    mortgageAdviserId: 'usr-mortgage-1',
    legalNotes: 'Lawyer assigned. Reviewing Queenstown Lakes District Council LIM reports.',
    legalStatus: 'Contract Review',
    lawyerId: 'usr-lawyer-1',
    conciergeNotes: 'Sent 2 listings in Kelvin Heights. Buyer has questions regarding body corporate rules.',
    conciergeStatus: 'Viewings Scheduled',
    conciergeId: 'usr-concierge-1',
    milestones: [
      { id: 'm-19', title: 'Onboarding & Profile Completed', description: 'Buyer profile set up and primary needs registered', completed: true, updatedAt: '2026-06-10T10:00:00Z', updatedBy: 'System' },
      { id: 'm-20', title: 'Mortgage Advisor Engagement', description: 'Connect with certified mortgage adviser and initiate financial review', completed: true, updatedAt: '2026-06-11T14:30:00Z', updatedBy: 'David Miller' },
      { id: 'm-21', title: 'Documents Uploaded', description: 'Upload proof of income, passport ID, and bank statements to secure vault', completed: true, updatedAt: '2026-06-11T15:00:00Z', updatedBy: 'System' },
      { id: 'm-22', title: 'Pre-Approval Loan', description: 'Mortgage lender issues formal pre-approval letter and rate lock terms', completed: true, updatedAt: '2026-06-12T11:00:00Z', updatedBy: 'David Miller' },
      { id: 'm-23', title: 'Real Estate Agent Match', description: 'Paired with expert local agent to source on-market & off-market homes', completed: true, updatedAt: '2026-06-13T09:00:00Z', updatedBy: 'Marcus Vance' },
      { id: 'm-24', title: 'Offer Accepted', description: 'Property offer submitted, negotiated, and legally accepted by vendor', completed: true, updatedAt: '2026-06-14T16:00:00Z', updatedBy: 'Marcus Vance' },
      { id: 'm-25', title: 'Lawyer Assigned', description: 'Property lawyer assigned for title deeds audit, LIM report & conveyancing', completed: true, updatedAt: '2026-06-15T10:00:00Z', updatedBy: 'Declared at Registration (Own Conveyancing Lawyer)' },
      { id: 'm-26', title: 'Settlement Scheduled', description: 'Final settlement date confirmed, bank drawdown prepared & funds cleared', completed: false, updatedAt: '2026-06-15T11:00:00Z', updatedBy: 'Elena Rostova' },
      { id: 'm-27', title: 'Insurance Completed', description: 'House cover and building insurance policy bound prior to settlement', completed: false, updatedAt: '2026-06-15T12:00:00Z', updatedBy: 'System' },
      { id: 'm-28', title: 'Mover Coordination', description: 'Relocation team booked, packing logistics and key pickup arranged', completed: false, updatedAt: '2026-06-15T13:00:00Z', updatedBy: 'System' },
      { id: 'm-29', title: 'Furnisher & Setup', description: 'Interior styling, furniture delivery, power, fiber internet & utility setup', completed: false, updatedAt: '2026-06-15T14:00:00Z', updatedBy: 'System' },
      { id: 'm-30', title: 'Settle Down', description: 'Keys handed over! Welcome to your new home in New Zealand', completed: false, updatedAt: '2026-06-15T15:00:00Z', updatedBy: 'System' }
    ]
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-07-06T09:15:00Z',
    userId: 'usr-admin-1',
    userName: 'Sarah Jenkins',
    userRole: 'Super Admin',
    action: 'System Audit',
    details: 'Super Admin reviewed global system activities and checked active query queues.'
  },
  {
    id: 'log-2',
    timestamp: '2026-07-06T11:45:00Z',
    userId: 'usr-mortgage-1',
    userName: 'David Miller',
    userRole: 'Mortgage Adviser',
    action: 'Update Query Notes',
    details: 'Updated mortgage notes on Alex Rivera\'s query (qry-1): Requested self-employment tax filings.',
    targetQueryId: 'qry-1'
  },
  {
    id: 'log-3',
    timestamp: '2026-07-06T14:22:00Z',
    userId: 'usr-concierge-1',
    userName: 'Marcus Vance',
    userRole: 'Real Estate Agent',
    action: 'Organize Listing Matching',
    details: 'Flagged 3 potential listings in Remuera & Orakei for Alex Rivera.',
    targetQueryId: 'qry-1'
  },
  {
    id: 'log-4',
    timestamp: '2026-07-07T09:30:00Z',
    userId: 'usr-lawyer-1',
    userName: 'Elena Rostova',
    userRole: 'Property Lawyer',
    action: 'Title Search Started',
    details: 'Initiated background title deed search in county registry for Clara Oswald.',
    targetQueryId: 'qry-2'
  }
];

export const createStandardJourneyMilestones = (
  isNewBuyer: boolean = true
): Milestone[] => {
  const now = new Date().toISOString();

  return [
    { 
      id: `m-0-${Date.now()}-0`, 
      title: 'Onboarding & Profile Completed', 
      description: 'Buyer profile set up and primary needs registered', 
      completed: true, 
      updatedAt: now, 
      updatedBy: 'System' 
    },
    { 
      id: `m-1-${Date.now()}-1`, 
      title: 'Mortgage Advisor Engagement', 
      description: 'Connect with certified mortgage adviser and initiate financial review', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-2-${Date.now()}-2`, 
      title: 'Documents Uploaded', 
      description: 'Upload proof of income, passport ID, and bank statements to secure vault', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-3-${Date.now()}-3`, 
      title: 'Pre-Approval Loan', 
      description: 'Mortgage lender issues formal pre-approval letter and rate lock terms', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-4-${Date.now()}-4`, 
      title: 'Real Estate Agent Match', 
      description: 'Paired with expert local agent to source on-market & off-market homes', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-5-${Date.now()}-5`, 
      title: 'Offer Accepted', 
      description: 'Property offer submitted, negotiated, and legally accepted by vendor', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-6-${Date.now()}-6`, 
      title: 'Lawyer Assigned', 
      description: 'Property lawyer assigned for title deeds audit, LIM report & conveyancing', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-7-${Date.now()}-7`, 
      title: 'Settlement Scheduled', 
      description: 'Final settlement date confirmed, bank drawdown prepared & funds cleared', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-8-${Date.now()}-8`, 
      title: 'Insurance Completed', 
      description: 'House cover and building insurance policy bound prior to settlement', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-9-${Date.now()}-9`, 
      title: 'Mover Coordination', 
      description: 'Relocation team booked, packing logistics and key pickup arranged', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-10-${Date.now()}-10`, 
      title: 'Furnisher & Setup', 
      description: 'Interior styling, furniture delivery, power, fiber internet & utility setup', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    },
    { 
      id: `m-11-${Date.now()}-11`, 
      title: 'Settle Down', 
      description: 'Keys handed over! Welcome to your new home in New Zealand', 
      completed: !isNewBuyer, 
      updatedAt: !isNewBuyer ? now : '', 
      updatedBy: !isNewBuyer ? 'Super Admin' : '' 
    }
  ];
};

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    timestamp: '2026-07-06T11:46:00Z',
    recipientId: 'usr-buyer-1',
    senderName: 'David Miller',
    senderRole: 'Mortgage Adviser',
    title: 'Mortgage Document Request',
    message: 'Please upload or provide your past 2 years of tax returns for self-employed assessment.',
    isRead: false,
    type: 'warning'
  },
  {
    id: 'notif-2',
    timestamp: '2026-07-07T09:35:00Z',
    recipientRole: 'Super Admin',
    senderName: 'Elena Rostova',
    senderRole: 'Property Lawyer',
    title: 'Legal Pipeline Updated',
    message: 'Title search started for query (Queenstown Alpine View Residence) by Clara Oswald.',
    isRead: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    timestamp: '2026-07-07T10:10:00Z',
    recipientRole: 'Real Estate Agent',
    senderName: 'Alex Rivera',
    senderRole: 'Home Buyer',
    title: 'New Listing Inquiry',
    message: 'I am interested in seeing the listing on Elm Street this Saturday.',
    isRead: false,
    type: 'alert'
  }
];
