/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import HomeBuyerDashboard from './components/HomeBuyerDashboard';
import MortgageAdviserDashboard from './components/MortgageAdviserDashboard';
import PropertyLawyerDashboard from './components/PropertyLawyerDashboard';
import RealEstateAgentDashboard from './components/RealEstateAgentDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import NotificationToast from './components/NotificationToast';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import CustomerServiceAgreement from './components/CustomerServiceAgreement';
import Disclaimer from './components/Disclaimer';

import { User, PropertyQuery, ActivityLog, SystemNotification, UserRole, Milestone, SharedDocument, DocumentCategory } from './types';
import { INITIAL_USERS, INITIAL_QUERIES, INITIAL_LOGS, INITIAL_NOTIFICATIONS, INITIAL_DOCUMENTS, DEFAULT_PASSWORDS, ROLE_DEFAULT_PASSWORDS, createStandardJourneyMilestones } from './mockData';

export default function App() {
  // Persistent State Loaders with automatic password backfilling for stored users
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('hometrack_users');
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge and ensure all users have exact passwords even if loaded from older cached localStorage
          const resolvedUsers: User[] = parsed.map((u: User) => {
            const cleanEmail = u.email?.trim().toLowerCase() || '';
            const matchInit = INITIAL_USERS.find(iu => iu.id === u.id || iu.email.toLowerCase() === cleanEmail);
            const expectedPass = u.password || matchInit?.password || DEFAULT_PASSWORDS[cleanEmail] || ROLE_DEFAULT_PASSWORDS[u.role] || 'Buyer@Settle2026';
            return {
              ...u,
              password: expectedPass
            };
          });

          // Ensure any missing initial demo users exist
          INITIAL_USERS.forEach((initU: User) => {
            if (!resolvedUsers.some(u => u.email.toLowerCase() === initU.email.toLowerCase())) {
              resolvedUsers.push(initU);
            }
          });

          return resolvedUsers;
        }
      } catch (e) {
        console.error('Failed to parse cached users', e);
      }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hometrack_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [queries, setQueries] = useState<PropertyQuery[]>(() => {
    const saved = localStorage.getItem('hometrack_queries');
    if (saved) {
      try {
        const parsed: PropertyQuery[] = JSON.parse(saved);
        return parsed.map(q => {
          const match = INITIAL_QUERIES.find(iq => iq.id === q.id);
          if (!q.milestones || q.milestones.length < 12) {
            return {
              ...q,
              milestones: match?.milestones || [
                { id: `m-0-${q.id}`, title: 'Onboarding & Profile Completed', description: 'Buyer profile set up and primary needs registered', completed: true, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-1-${q.id}`, title: 'Mortgage Advisor Engagement', description: 'Connect with certified mortgage adviser and initiate financial review', completed: !!q.mortgageAdviserId, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-2-${q.id}`, title: 'Documents Uploaded', description: 'Upload proof of income, passport ID, and bank statements to secure vault', completed: true, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-3-${q.id}`, title: 'Pre-Approval Loan', description: 'Mortgage lender issues formal pre-approval letter and rate lock terms', completed: q.mortgageStatus === 'Offer Issued' || q.status === 'Approved', updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-4-${q.id}`, title: 'Real Estate Agent Match', description: 'Paired with expert local agent to source on-market & off-market homes', completed: !!q.conciergeId, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-5-${q.id}`, title: 'Offer Accepted', description: 'Property offer submitted, negotiated, and legally accepted by vendor', completed: q.conciergeStatus === 'Offer Negotiations' || q.conciergeStatus === 'Settled', updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-6-${q.id}`, title: 'Lawyer Assigned', description: 'Property lawyer assigned for title deeds audit, LIM report & conveyancing', completed: !!q.lawyerId, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-7-${q.id}`, title: 'Settlement Scheduled', description: 'Final settlement date confirmed, bank drawdown prepared & funds cleared', completed: q.legalStatus === 'Exchange Pending' || q.legalStatus === 'Completed', updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-8-${q.id}`, title: 'Insurance Completed', description: 'House cover and building insurance policy bound prior to settlement', completed: false, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-9-${q.id}`, title: 'Mover Coordination', description: 'Relocation team booked, packing logistics and key pickup arranged', completed: false, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-10-${q.id}`, title: 'Furnisher & Setup', description: 'Interior styling, furniture delivery, power, fiber internet & utility setup', completed: false, updatedAt: new Date().toISOString(), updatedBy: 'System' },
                { id: `m-11-${q.id}`, title: 'Settle Down', description: 'Keys handed over! Welcome to your new home in New Zealand', completed: false, updatedAt: new Date().toISOString(), updatedBy: 'System' }
              ]
            };
          }
          return q;
        });
      } catch (e) {
        console.error('Failed to parse queries from localStorage', e);
      }
    }
    return INITIAL_QUERIES;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('hometrack_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('hometrack_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [documents, setDocuments] = useState<SharedDocument[]>(() => {
    const saved = localStorage.getItem('hometrack_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [currentView, setCurrentView] = useState<string>(() => {
    const savedUser = localStorage.getItem('hometrack_current_user');
    return savedUser ? 'dashboard' : 'login';
  });

  const [isSuperAdminSession, setIsSuperAdminSession] = useState<boolean>(() => {
    const savedAdmin = localStorage.getItem('hometrack_is_super_admin_session');
    if (savedAdmin) {
      try {
        return JSON.parse(savedAdmin);
      } catch (e) {
        return false;
      }
    }
    // Default to true if current stored user is Super Admin
    const savedUser = localStorage.getItem('hometrack_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        return u?.role === 'Super Admin';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  // Synchronizers to localStorage with quota protection and fallback
  useEffect(() => {
    try {
      localStorage.setItem('hometrack_users', JSON.stringify(users));
    } catch (e) {
      console.warn('Could not persist users to localStorage:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('hometrack_current_user', currentUser ? JSON.stringify(currentUser) : '');
    } catch (e) {
      console.warn('Could not persist current user to localStorage:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('hometrack_queries', JSON.stringify(queries));
    } catch (e) {
      console.warn('Could not persist queries to localStorage:', e);
    }
  }, [queries]);

  useEffect(() => {
    try {
      localStorage.setItem('hometrack_logs', JSON.stringify(activityLogs));
    } catch (e) {
      console.warn('Could not persist activity logs to localStorage:', e);
    }
  }, [activityLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('hometrack_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Could not persist notifications to localStorage:', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      // Store documents safely by excluding excessive raw base64 payloads to preserve mobile quota
      const lightweightDocs = documents.map(d => {
        if (d.downloadUrl && d.downloadUrl.length > 50000) {
          const { downloadUrl, ...rest } = d;
          return rest;
        }
        return d;
      });
      localStorage.setItem('hometrack_documents', JSON.stringify(lightweightDocs));
    } catch (e) {
      console.warn('Could not persist documents with URLs, attempting metadata-only fallback:', e);
      try {
        const metadataOnly = documents.map(({ downloadUrl, ...rest }) => rest);
        localStorage.setItem('hometrack_documents', JSON.stringify(metadataOnly));
      } catch (innerErr) {
        console.warn('Could not persist documents metadata to localStorage:', innerErr);
      }
    }
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem('hometrack_is_super_admin_session', JSON.stringify(isSuperAdminSession));
    } catch (e) {
      console.warn('Could not persist super admin session flag to localStorage:', e);
    }
  }, [isSuperAdminSession]);

  // General helpers
  const logActivity = (action: string, details: string, targetQueryId?: string, targetUserId?: string, altUser?: User) => {
    const active = altUser || currentUser;
    if (!active) return;
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      userId: active.id,
      userName: active.name,
      userRole: active.role,
      action,
      details,
      targetQueryId,
      targetUserId
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const triggerNotification = (
    recipientId?: string, 
    recipientRole?: UserRole, 
    title = '', 
    message = '', 
    type: 'info' | 'success' | 'warning' | 'alert' = 'info',
    altUser?: User
  ) => {
    const sender = altUser || currentUser;
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      recipientId,
      recipientRole,
      senderName: sender ? sender.name : 'System Alert',
      senderRole: sender ? sender.role : 'Super Admin',
      title,
      message,
      isRead: false,
      type
    };
    setNotifications(prev => [...prev, newNotif]);
  };

  // Auth operations
  const handleLogin = (email: string, password?: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password?.trim() || '';
    
    // Find user in active state or fallback to INITIAL_USERS template
    let user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      user = INITIAL_USERS.find(iu => iu.email.toLowerCase() === cleanEmail);
    }
    
    if (!user) {
      return { 
        success: false, 
        error: 'No account found with this email address. Please verify your email or register a new profile.' 
      };
    }

    // Resolve exact expected password
    const expectedPassword = user.password || DEFAULT_PASSWORDS[cleanEmail] || ROLE_DEFAULT_PASSWORDS[user.role] || 'Buyer@Settle2026';

    if (cleanPassword !== expectedPassword) {
      return { 
        success: false, 
        error: 'Incorrect password. Passwords are case-sensitive and must match your account credentials.' 
      };
    }

    const authenticatedUser: User = {
      ...user,
      password: expectedPassword
    };

    // Ensure state has the updated user with password
    setUsers(prev => {
      const exists = prev.some(u => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return prev.map(u => u.email.toLowerCase() === cleanEmail ? authenticatedUser : u);
      }
      return [...prev, authenticatedUser];
    });

    setCurrentUser(authenticatedUser);
    setIsSuperAdminSession(authenticatedUser.role === 'Super Admin');
    setCurrentView('dashboard');
    logActivity('User Sign In', `Signed into secure portal on ${new Date().toLocaleString()}`, undefined, undefined, authenticatedUser);
    
    // Seed a welcome notification for them
    triggerNotification(
      authenticatedUser.id,
      undefined,
      'Secure Session Established',
      `Welcome to SettleMate. You are signed in as ${authenticatedUser.name} (${authenticatedUser.role}).`,
      'success',
      authenticatedUser
    );
    return { success: true };
  };

  const handleLogout = () => {
    if (currentUser) {
      logActivity('User Sign Out', `Signed out of secure portal`);
    }
    setCurrentUser(null);
    setIsSuperAdminSession(false);
    setCurrentView('login');
  };

  const handleSwitchSimulatedUser = (role: UserRole) => {
    // Demo helper to immediately shift current session
    let targetUser = users.find(u => u.role === role);
    if (!targetUser) {
      targetUser = INITIAL_USERS.find(u => u.role === role);
    }
    if (targetUser) {
      const expectedPass = targetUser.password || DEFAULT_PASSWORDS[targetUser.email.toLowerCase()] || ROLE_DEFAULT_PASSWORDS[role] || 'Buyer@Settle2026';
      const updatedTarget: User = {
        ...targetUser,
        password: expectedPass
      };
      setCurrentUser(updatedTarget);
      setCurrentView('dashboard');
      logActivity('RBAC Switch Simulation', `Switched role simulation session to ${updatedTarget.name} (${role})`, undefined, undefined, updatedTarget);
    } else {
      // Create user if not existing
      const templateNames = {
        'Home Buyer': 'Alex Rivera',
        'Mortgage Adviser': 'David Miller',
        'Property Lawyer': 'Elena Rostova',
        'Real Estate Agent': 'Marcus Vance',
        'Super Admin': 'Sarah Jenkins'
      };
      const templateEmails = {
        'Home Buyer': 'buyer@hometrack.com',
        'Mortgage Adviser': 'mortgage@hometrack.com',
        'Property Lawyer': 'lawyer@hometrack.com',
        'Real Estate Agent': 'concierge@hometrack.com',
        'Super Admin': 'admin@hometrack.com'
      };
      const newUser: User = {
        id: `usr-${role.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
        name: templateNames[role],
        email: templateEmails[role],
        password: ROLE_DEFAULT_PASSWORDS[role] || 'Buyer@Settle2026',
        role,
        profileCompleted: true,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setCurrentView('dashboard');
      logActivity('RBAC Auto-Create Simulation', `Initialized and signed into auto-created simulation account for ${role}`, undefined, undefined, newUser);
    }
  };

  // Profile operations
  const handleSaveProfile = (profileData: {
    name: string;
    email?: string;
    password?: string;
    phone: string;
    role: UserRole;
    avatarUrl?: string;
    buyerDetails?: any;
  }) => {
    let targetUser = currentUser;

    if (targetUser) {
      // Modify active user
      const updatedUser: User = {
        ...targetUser,
        name: profileData.name,
        phone: profileData.phone,
        role: profileData.role,
        password: profileData.password ? profileData.password : targetUser.password,
        avatarUrl: profileData.avatarUrl !== undefined ? profileData.avatarUrl : targetUser.avatarUrl,
        buyerDetails: profileData.buyerDetails,
        profileCompleted: true
      };
      setUsers(prev => prev.map(u => u.id === targetUser!.id ? updatedUser : u));
      setCurrentUser(updatedUser);

      logActivity('Update User Profile', `Successfully updated profile specifications for ${profileData.name}`, undefined, targetUser.id, updatedUser);
    } else {
      // Registration flow (Super Admin accounts cannot be created via public registration)
      const sanitizedRole: UserRole = profileData.role === 'Super Admin' ? 'Home Buyer' : profileData.role;
      const newUserId = `usr-${sanitizedRole.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
      const newUserEmail = profileData.email?.trim().toLowerCase() || `${profileData.name.toLowerCase().replace(/\s+/g, '.') || 'user'}@settlemate.co.nz`;
      const newUser: User = {
        id: newUserId,
        email: newUserEmail,
        password: profileData.password || 'Buyer@Settle2026',
        name: profileData.name,
        phone: profileData.phone,
        role: sanitizedRole,
        avatarUrl: profileData.avatarUrl,
        buyerDetails: sanitizedRole === 'Home Buyer' ? profileData.buyerDetails : undefined,
        profileCompleted: true,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);

      // If registered as a Home Buyer, automatically create their initial property query so their dashboard is ready
      if (sanitizedRole === 'Home Buyer') {
        const queryId = `qry-${Date.now()}`;
        const newQuery: PropertyQuery = {
          id: queryId,
          buyerId: newUserId,
          buyerName: profileData.name,
          title: `${profileData.buyerDetails?.propertyType || 'Standalone Home'} in ${profileData.buyerDetails?.desiredLocation || 'Auckland, NZ'}`,
          description: `Initial property query for ${profileData.name}. Timeline: ${profileData.buyerDetails?.preferredTimeline || '3-6 Months'}.`,
          budget: profileData.buyerDetails?.budget || 1650000,
          location: profileData.buyerDetails?.desiredLocation || 'Remuera, Auckland, NZ',
          status: 'Pending',
          createdAt: new Date().toISOString(),
          milestones: createStandardJourneyMilestones(true)
        };
        setQueries(prev => [newQuery, ...prev]);
      }

      logActivity('Register User Profile', `Registered new role profile ${profileData.name} (${profileData.role})`, undefined, newUserId, newUser);
    }
  };

  // Buyer Inquiry Operations
  const handleCreateQuery = (queryData: { title: string; description: string; budget: number; location: string }) => {
    if (!currentUser) return;

    const newQueryId = `qry-${Date.now()}`;
    const newQuery: PropertyQuery = {
      id: newQueryId,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      title: queryData.title,
      description: queryData.description,
      budget: queryData.budget,
      location: queryData.location,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      milestones: createStandardJourneyMilestones(true)
    };

    setQueries(prev => [...prev, newQuery]);
    logActivity('Submit Property Inquiry', `Buyer alex rivera initiated inquiry ${queryData.title}`, newQueryId);
    
    // Notify all staff roles about the new buyer query
    triggerNotification(
      undefined,
      'Mortgage Adviser',
      'New Mortgage Inquiry Pending',
      `New buyer ${currentUser.name} submitted search in ${queryData.location} with budget $${queryData.budget.toLocaleString()}. Assessment required.`,
      'alert'
    );
    triggerNotification(
      undefined,
      'Real Estate Agent',
      'New Client Sourcing Request',
      `New buyer ${currentUser.name} is looking for property in ${queryData.location}. Matching options needed.`,
      'info'
    );
    triggerNotification(
      undefined,
      'Super Admin',
      'Pipeline Transaction Initiated',
      `Buyer ${currentUser.name} initiated query ID: ${newQueryId}.`,
      'success'
    );
  };

  const handleSendMessage = (queryId: string, message: string) => {
    if (!currentUser) return;
    logActivity('Intercom Message Sent', `Posted inquiry question to advisory channels: "${message}"`, queryId);
    
    // Broadcast notification to advisers assigned or generic advisers
    triggerNotification(
      undefined,
      'Real Estate Agent',
      `Message from ${currentUser.name}`,
      message,
      'alert'
    );
    triggerNotification(
      undefined,
      'Mortgage Adviser',
      `Message from ${currentUser.name}`,
      message,
      'alert'
    );
  };

  // Adviser Decision Updates
  const handleUpdateMortgageStatus = (
    queryId: string,
    mortgageStatus: 'Awaiting Assessment' | 'Documents Requested' | 'Offer Issued' | 'Rejected',
    notes: string,
    completeMilestone: boolean
  ) => {
    if (!currentUser) return;

    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        // Find mortgage milestone
        const updatedMilestones = q.milestones.map(m => {
          if (m.title === 'Mortgage Pre-Approval') {
            return {
              ...m,
              completed: completeMilestone,
              updatedAt: new Date().toISOString(),
              updatedBy: currentUser.name
            };
          }
          return m;
        });

        // If milestone is completed, shift global status
        let globalStatus = q.status;
        if (mortgageStatus === 'Rejected') {
          globalStatus = 'Rejected';
        } else if (mortgageStatus === 'Documents Requested') {
          globalStatus = 'Action Required';
        } else if (completeMilestone) {
          globalStatus = 'In Progress';
        }

        return {
          ...q,
          mortgageStatus,
          mortgageNotes: notes,
          mortgageAdviserId: currentUser.id,
          status: globalStatus,
          milestones: updatedMilestones
        };
      }
      return q;
    }));

    logActivity('Mortgage Status Assessment', `Updated status to "${mortgageStatus}" with adviser annotations.`, queryId);
  };

  const handleUpdateLegalStatus = (
    queryId: string,
    legalStatus: 'Title Deed Search' | 'Contract Review' | 'Exchange Pending' | 'Completed',
    notes: string,
    completeMilestone: boolean
  ) => {
    if (!currentUser) return;

    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        // Find legal milestone
        const updatedMilestones = q.milestones.map(m => {
          if (m.title === 'Legal Conveyancing & Contract') {
            return {
              ...m,
              completed: completeMilestone,
              updatedAt: new Date().toISOString(),
              updatedBy: currentUser.name
            };
          }
          return m;
        });

        let globalStatus = q.status;
        if (completeMilestone) {
          globalStatus = 'In Progress';
        }

        return {
          ...q,
          legalStatus,
          legalNotes: notes,
          lawyerId: currentUser.id,
          status: globalStatus,
          milestones: updatedMilestones
        };
      }
      return q;
    }));

    logActivity('Conveyancing Audit Updated', `Updated legal conveyancing to "${legalStatus}" with lawyer comments.`, queryId);
  };

  const handleUpdateConciergeStatus = (
    queryId: string,
    conciergeStatus: 'Searching Properties' | 'Viewings Scheduled' | 'Offer Negotiations' | 'Settled',
    notes: string,
    completeMilestone: boolean
  ) => {
    if (!currentUser) return;

    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        // Find concierge milestone
        const updatedMilestones = q.milestones.map(m => {
          if (m.title === 'Property Matching & Viewings') {
            return {
              ...m,
              completed: completeMilestone,
              updatedAt: new Date().toISOString(),
              updatedBy: currentUser.name
            };
          }
          return m;
        });

        // If settled, mark transaction completed
        let globalStatus = q.status;
        if (conciergeStatus === 'Settled') {
          globalStatus = 'Completed';
          // Also complete handover milestone
          q.milestones.map(m => {
            if (m.title === 'Transaction Closing & Handover') {
              m.completed = true;
              m.updatedAt = new Date().toISOString();
              m.updatedBy = 'System';
            }
          });
        } else if (completeMilestone) {
          globalStatus = 'In Progress';
        }

        return {
          ...q,
          conciergeStatus,
          conciergeNotes: notes,
          conciergeId: currentUser.id,
          status: globalStatus,
          milestones: updatedMilestones
        };
      }
      return q;
    }));

    logActivity('Real Estate Agent Matchmaking Assessment', `Updated sourcing status to "${conciergeStatus}".`, queryId);
  };

  // Super Admin actions
  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        logActivity('Security Role Override', `Admin overridden role for ${u.name} to "${newRole}"`, undefined, userId);
        
        // Notify the user of access tier elevation
        triggerNotification(
          u.id,
          undefined,
          'Security Access Tier Updated',
          `Your access level on SettleMate NZ Concierge Portal has been configured to: ${newRole}. Re-auth to apply configurations.`,
          'warning'
        );
        return {
          ...u,
          role: newRole
        };
      }
      return u;
    }));
  };

  const handleUpdateUser = (updatedUserData: Partial<User> & { id: string }) => {
    setUsers(prev => prev.map(u => {
      if (u.id === updatedUserData.id) {
        const updated: User = {
          ...u,
          ...updatedUserData
        };
        logActivity(
          'Admin Modified Directory User',
          `Super Admin updated account details for ${updated.name} (${updated.role})`,
          undefined,
          updated.id
        );
        triggerNotification(
          updated.id,
          undefined,
          'Account Record Updated',
          `Your profile details have been updated by Super Admin coordinator.`,
          'info'
        );
        return updated;
      }
      return u;
    }));

    if (currentUser && currentUser.id === updatedUserData.id) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedUserData } : null);
    }
  };

  const handleAddUser = (newUserData: Omit<User, 'id' | 'createdAt'>) => {
    const newId = `usr-${newUserData.role.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
    const newUser: User = {
      ...newUserData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    logActivity('Create Directory User', `Admin added account for ${newUserData.name} (${newUserData.role})`, undefined, newId);
    
    // Send hello notification to new user
    triggerNotification(
      newId,
      undefined,
      'Welcome to SettleMate NZ Concierge Portal',
      'Your supervisor Sarah Jenkins has initialized your account portal. Configure your security preferences.',
      'success'
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (currentUser && currentUser.id === userId) {
      alert('You cannot delete your active Super Admin session account.');
      return;
    }
    const target = users.find(u => u.id === userId);
    if (target) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      logActivity('Delete User Account', `Admin deleted user account for ${target.name} (${target.role})`, undefined, userId);
    }
  };

  const handleCreateAdminQuery = (queryData: {
    title: string;
    description: string;
    budget: number;
    location: string;
    buyerId?: string;
    buyerName?: string;
  }) => {
    const selectedBuyer = users.find(u => u.id === queryData.buyerId) || users.find(u => u.role === 'Home Buyer') || currentUser;
    const newQueryId = `qry-${Date.now()}`;
    const newQuery: PropertyQuery = {
      id: newQueryId,
      buyerId: selectedBuyer?.id || 'usr-buyer-1',
      buyerName: queryData.buyerName || selectedBuyer?.name || 'Alex Rivera',
      title: queryData.title,
      description: queryData.description,
      budget: queryData.budget,
      location: queryData.location,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      milestones: createStandardJourneyMilestones(true)
    };

    setQueries(prev => [...prev, newQuery]);
    logActivity('Create Property Inquiry', `Super Admin registered property request "${queryData.title}" for ${newQuery.buyerName}`, newQueryId);
  };

  // Super Admin Stage Approval & Milestone Handlers
  const handleApproveNextStage = (queryId: string, notes?: string) => {
    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        const currentMilestones = q.milestones && q.milestones.length > 0 
          ? [...q.milestones] 
          : createStandardJourneyMilestones(true);

        const nextMilestoneIndex = currentMilestones.findIndex(m => !m.completed);
        if (nextMilestoneIndex === -1) {
          return q; // All stages already approved
        }

        const targetMilestone = currentMilestones[nextMilestoneIndex];
        const updatedMilestones = currentMilestones.map((m, idx) => {
          if (idx === nextMilestoneIndex) {
            return {
              ...m,
              completed: true,
              updatedAt: new Date().toISOString(),
              updatedBy: currentUser ? `${currentUser.name} (Super Admin)` : 'Super Admin'
            };
          }
          return m;
        });

        const isAllDone = updatedMilestones.every(m => m.completed);
        const newGlobalStatus = isAllDone ? 'Completed' : 'In Progress';

        // Notify the buyer in real time
        triggerNotification(
          q.buyerId,
          undefined,
          `Stage Approved: ${targetMilestone.title}`,
          `Your coordinator has verified and officially approved Stage ${nextMilestoneIndex + 1}: "${targetMilestone.title}". Your journey progress has advanced!${notes ? ` (Admin Note: ${notes})` : ''}`,
          'success'
        );

        logActivity(
          'Journey Stage Approved',
          `Super Admin approved Stage ${nextMilestoneIndex + 1} (${targetMilestone.title}) for buyer ${q.buyerName}.`,
          queryId
        );

        return {
          ...q,
          status: newGlobalStatus,
          milestones: updatedMilestones
        };
      }
      return q;
    }));
  };

  const handleSetBuyerStage = (queryId: string, targetStageIndex: number) => {
    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        const currentMilestones = q.milestones && q.milestones.length > 0 
          ? [...q.milestones] 
          : createStandardJourneyMilestones(true);

        const updatedMilestones = currentMilestones.map((m, idx) => ({
          ...m,
          completed: idx <= targetStageIndex,
          updatedAt: idx <= targetStageIndex ? (m.updatedAt || new Date().toISOString()) : '',
          updatedBy: idx <= targetStageIndex ? (m.updatedBy || (currentUser ? `${currentUser.name} (Super Admin)` : 'Super Admin')) : ''
        }));

        const isAllDone = updatedMilestones.every(m => m.completed);
        const newGlobalStatus = isAllDone ? 'Completed' : 'In Progress';
        const targetTitle = currentMilestones[targetStageIndex]?.title || `Stage ${targetStageIndex + 1}`;

        triggerNotification(
          q.buyerId,
          undefined,
          `Journey Stage Updated`,
          `Super Admin updated your active journey progression to Stage ${targetStageIndex + 1}: "${targetTitle}".`,
          'info'
        );

        logActivity(
          'Journey Stage Progress Set',
          `Super Admin set journey progression to Stage ${targetStageIndex + 1} (${targetTitle}) for buyer ${q.buyerName}.`,
          queryId
        );

        return {
          ...q,
          status: newGlobalStatus,
          milestones: updatedMilestones
        };
      }
      return q;
    }));
  };

  const handleToggleMilestone = (queryId: string, milestoneId: string) => {
    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        let changedTitle = '';
        let wasApproved = false;
        const updatedMilestones = q.milestones.map(m => {
          if (m.id === milestoneId) {
            changedTitle = m.title;
            wasApproved = !m.completed;
            return {
              ...m,
              completed: !m.completed,
              updatedAt: new Date().toISOString(),
              updatedBy: currentUser ? `${currentUser.name} (Super Admin)` : 'Super Admin'
            };
          }
          return m;
        });

        if (changedTitle) {
          logActivity(
            wasApproved ? 'Stage Milestone Approved' : 'Stage Milestone Reopened',
            `Super Admin ${wasApproved ? 'approved' : 'reopened'} milestone "${changedTitle}" for buyer ${q.buyerName}.`,
            queryId
          );
          triggerNotification(
            q.buyerId,
            undefined,
            `Stage ${wasApproved ? 'Approved' : 'Status Updated'}`,
            `Your Super Admin coordinator has ${wasApproved ? 'approved' : 'updated'} milestone: "${changedTitle}".`,
            wasApproved ? 'success' : 'info'
          );
        }

        return {
          ...q,
          milestones: updatedMilestones
        };
      }
      return q;
    }));
  };

  const handleDeleteQuery = (queryId: string) => {
    const target = queries.find(q => q.id === queryId);
    if (target) {
      setQueries(prev => prev.filter(q => q.id !== queryId));
      logActivity('Delete Property Inquiry', `Super Admin deleted property enquiry "${target.title}" (ID: ${queryId})`);
    }
  };

  const handleSendBroadcast = (targetRole: UserRole | 'All', title: string, message: string) => {
    logActivity('Global Broadcast Sent', `Deployed system-wide alert targeted to segment: "${targetRole}"`);
    
    // Trigger notification to the targets
    if (targetRole === 'All') {
      // Send separate private notifications to all users in simulator or just role broadcast
      // We will create a role broadcast
      const newNotif: SystemNotification = {
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        senderName: currentUser?.name || 'Super Admin',
        senderRole: 'Super Admin',
        title,
        message,
        isRead: false,
        type: 'alert'
      };
      setNotifications(prev => [...prev, newNotif]);
    } else {
      const newNotif: SystemNotification = {
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        recipientRole: targetRole,
        senderName: currentUser?.name || 'Super Admin',
        senderRole: 'Super Admin',
        title,
        message,
        isRead: false,
        type: 'alert'
      };
      setNotifications(prev => [...prev, newNotif]);
    }
  };

  const handleResetDatabase = () => {
    // Return DB to seed values
    setUsers(INITIAL_USERS);
    setQueries(INITIAL_QUERIES);
    setActivityLogs(INITIAL_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setCurrentUser(INITIAL_USERS.find(u => u.role === 'Super Admin') || INITIAL_USERS[0]);
    setIsSuperAdminSession(true);
    setCurrentView('dashboard');
    
    const adminUser = INITIAL_USERS.find(u => u.role === 'Super Admin') || INITIAL_USERS[0];
    logActivity('Reset Demo Database', 'Super Admin restored all databases and directories to fresh seeded defaults', undefined, undefined, adminUser);
  };

  // Document Vault Handlers
  const handleUploadDocument = (docData: {
    fileName: string;
    fileCategory: DocumentCategory;
    fileSize: string;
    sharedWith: ('All Team' | UserRole)[];
    notes?: string;
    downloadUrl?: string;
  }) => {
    if (!currentUser) return;

    const activeQuery = queries.find(q => q.buyerId === currentUser.id) || queries[0];

    const newDoc: SharedDocument = {
      id: `doc-${Date.now()}`,
      queryId: activeQuery?.id,
      buyerId: currentUser.role === 'Home Buyer' ? currentUser.id : (activeQuery?.buyerId || currentUser.id),
      buyerName: currentUser.role === 'Home Buyer' ? currentUser.name : (activeQuery?.buyerName || currentUser.name),
      fileName: docData.fileName,
      fileCategory: docData.fileCategory,
      fileSize: docData.fileSize,
      uploadDate: new Date().toISOString(),
      sharedWith: docData.sharedWith,
      status: 'Shared',
      notes: docData.notes,
      downloadUrl: docData.downloadUrl
    };

    setDocuments(prev => [newDoc, ...prev]);

    logActivity(
      'Paper Shared',
      `${currentUser.name} (${currentUser.role}) uploaded and shared "${docData.fileName}" (${docData.fileCategory}) with ${docData.sharedWith.join(', ')}.`,
      activeQuery?.id
    );

    // Send notifications to shared roles
    docData.sharedWith.forEach(role => {
      triggerNotification(
        undefined,
        role === 'All Team' ? undefined : role,
        'New Document Shared in Vault',
        `${currentUser.name} uploaded ${docData.fileCategory}: "${docData.fileName}".`,
        'info'
      );
    });
  };

  const handleUpdateDocumentSharing = (docId: string, sharedWith: ('All Team' | UserRole)[]) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return { ...doc, sharedWith };
      }
      return doc;
    }));

    const doc = documents.find(d => d.id === docId);
    if (doc && currentUser) {
      logActivity('Document Permissions Updated', `Permissions for "${doc.fileName}" updated to ${sharedWith.join(', ')}.`);
    }
  };

  const handleUpdateDocumentStatus = (
    docId: string, 
    status: 'Shared' | 'Under Review' | 'Verified' | 'Requires Update', 
    notes?: string
  ) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return { ...doc, status, notes: notes !== undefined ? notes : doc.notes };
      }
      return doc;
    }));

    const doc = documents.find(d => d.id === docId);
    if (doc && currentUser) {
      logActivity('Document Audit Complete', `${currentUser.name} (${currentUser.role}) marked "${doc.fileName}" as ${status}.`);
      
      triggerNotification(
        doc.buyerId,
        undefined,
        `Document Verification: ${status}`,
        `Your document "${doc.fileName}" was audited by ${currentUser.name} (${currentUser.role}). Status set to ${status}.${notes ? ` Notes: ${notes}` : ''}`,
        status === 'Verified' ? 'success' : status === 'Requires Update' ? 'warning' : 'info'
      );
    }
  };

  const handleDeleteDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    setDocuments(prev => prev.filter(d => d.id !== docId));
    if (doc && currentUser) {
      logActivity('Document Removed', `Removed "${doc.fileName}" from Document Vault.`);
    }
  };

  // Notification read triggers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleClearNotifications = () => {
    setNotifications(prev => prev.map(n => {
      if (currentUser) {
        if (n.recipientId === currentUser.id || n.recipientRole === currentUser.role || !n.recipientRole) {
          return { ...n, isRead: true };
        }
      }
      return n;
    }));
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  // Render view dispatcher
  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'Home Buyer':
        return (
          <HomeBuyerDashboard
            currentUser={currentUser}
            queries={queries}
            documents={documents}
            onCreateQuery={handleCreateQuery}
            onSendMessage={handleSendMessage}
            onUploadDocument={handleUploadDocument}
            onUpdateSharing={handleUpdateDocumentSharing}
            onDeleteDocument={handleDeleteDocument}
            onToggleMilestone={handleToggleMilestone}
          />
        );
      case 'Mortgage Adviser':
        return (
          <MortgageAdviserDashboard
            currentUser={currentUser}
            queries={queries}
            documents={documents}
            onUpdateMortgageStatus={handleUpdateMortgageStatus}
            onSendNotification={(recId, title, msg) => triggerNotification(recId, undefined, title, msg, 'warning')}
            onUploadDocument={handleUploadDocument}
            onUpdateSharing={handleUpdateDocumentSharing}
            onUpdateStatus={handleUpdateDocumentStatus}
          />
        );
      case 'Property Lawyer':
        return (
          <PropertyLawyerDashboard
            currentUser={currentUser}
            queries={queries}
            documents={documents}
            onUpdateLegalStatus={handleUpdateLegalStatus}
            onSendNotification={(recId, title, msg) => triggerNotification(recId, undefined, title, msg, 'info')}
            onUploadDocument={handleUploadDocument}
            onUpdateSharing={handleUpdateDocumentSharing}
            onUpdateStatus={handleUpdateDocumentStatus}
          />
        );
      case 'Real Estate Agent':
        return (
          <RealEstateAgentDashboard
            currentUser={currentUser}
            queries={queries}
            documents={documents}
            onUpdateConciergeStatus={handleUpdateConciergeStatus}
            onSendNotification={(recId, title, msg) => triggerNotification(recId, undefined, title, msg, 'success')}
            onUploadDocument={handleUploadDocument}
            onUpdateSharing={handleUpdateDocumentSharing}
            onUpdateStatus={handleUpdateDocumentStatus}
          />
        );
      case 'Super Admin':
        return (
          <SuperAdminDashboard
            currentUser={currentUser}
            users={users}
            queries={queries}
            activityLogs={activityLogs}
            documents={documents}
            onUpdateUserRole={handleUpdateUserRole}
            onUpdateUser={handleUpdateUser}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onAddQuery={handleCreateAdminQuery}
            onDeleteQuery={handleDeleteQuery}
            onSendBroadcast={handleSendBroadcast}
            onResetDatabase={handleResetDatabase}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            currentView={currentView}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            onClearNotifications={handleClearNotifications}
            onUploadDocument={handleUploadDocument}
            onUpdateSharing={handleUpdateDocumentSharing}
            onUpdateStatus={handleUpdateDocumentStatus}
            onDeleteDocument={handleDeleteDocument}
            onApproveNextStage={handleApproveNextStage}
            onSetBuyerStage={handleSetBuyerStage}
            onToggleMilestone={handleToggleMilestone}
          />
        );
      default:
        return <div className="p-12 text-center text-slate-500 text-sm">Role not recognized</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans" id="applet-viewport">
      {/* Navbar top (hidden on login, register, privacy policy, and agreement standalone pages) */}
      {currentView !== 'login' && currentView !== 'register' && currentView !== 'privacy' && currentView !== 'cookies' && currentView !== 'csa' && currentView !== 'disclaimer' && (
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onClearNotifications={handleClearNotifications}
          onNavigate={handleNavigate}
          currentView={currentView}
        />
      )}

      {/* Real-time alert slide-in notifications */}
      <NotificationToast notifications={notifications} />

      {/* Primary body screen */}
      <main className="flex-grow">
        {currentView === 'privacy' && (
          <PrivacyPolicy 
            onBack={() => handleNavigate(currentUser ? 'dashboard' : 'login')} 
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'cookies' && (
          <CookiePolicy 
            onBack={() => handleNavigate(currentUser ? 'dashboard' : 'login')} 
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'csa' && (
          <CustomerServiceAgreement 
            onBack={() => handleNavigate(currentUser ? 'dashboard' : 'login')} 
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'disclaimer' && (
          <Disclaimer 
            onBack={() => handleNavigate(currentUser ? 'dashboard' : 'login')} 
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'login' && (
          <Login
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            users={users}
          />
        )}
        {currentView === 'register' && (
          <ProfileSetup
            currentUser={null}
            onSaveProfile={handleSaveProfile}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'profile' && (
          <ProfileSetup
            currentUser={currentUser}
            onSaveProfile={handleSaveProfile}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'dashboard' && renderDashboard()}
      </main>

      {/* Global Application Footer */}
      {currentView !== 'login' && currentView !== 'register' && (
        <footer className="bg-white border-t border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-auto print:hidden" id="app-global-footer">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-slate-600">
              <span className="font-semibold text-slate-800">SettleMate Limited (New Zealand)</span>
              <span>•</span>
              <span className="text-[#de5d26] font-medium">One Journey. One Coordinator.</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigate('privacy')}
                className="hover:text-slate-800 transition underline cursor-pointer"
                id="footer-privacy-link"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigate('cookies')}
                className="hover:text-slate-800 transition underline cursor-pointer"
                id="footer-cookies-link"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => handleNavigate('csa')}
                className="hover:text-[#c84617] transition underline cursor-pointer font-bold text-[#de5d26]"
                id="footer-csa-link"
                title="Customer Service Agreement"
              >
                CSA
              </button>
              <button
                onClick={() => handleNavigate('disclaimer')}
                className="hover:text-slate-800 transition underline cursor-pointer"
                id="footer-disclaimer-link"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
