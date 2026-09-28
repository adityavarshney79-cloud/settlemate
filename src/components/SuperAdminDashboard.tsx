/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  FileText, 
  Activity, 
  PlusCircle, 
  UserMinus, 
  Edit3, 
  Trash2, 
  Search, 
  Check,
  CheckCircle2, 
  BellRing,
  Send,
  Sliders,
  DollarSign,
  MapPin,
  RefreshCcw,
  Home,
  MessageSquare,
  Percent,
  FileCheck,
  UserCheck,
  Gavel,
  Handshake,
  ShieldCheck,
  Truck,
  Armchair,
  CheckSquare,
  BarChart3,
  Building,
  Settings,
  HelpCircle,
  Eye,
  LogOut,
  Calendar,
  AlertCircle,
  Bell,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';
import { User, PropertyQuery, ActivityLog, UserRole, SharedDocument, DocumentCategory } from '../types';
import DocumentVault from './DocumentVault';

interface SuperAdminDashboardProps {
  currentUser: User;
  users: User[];
  queries: PropertyQuery[];
  activityLogs: ActivityLog[];
  documents?: SharedDocument[];
  onUpdateUserRole: (userId: string, newRole: UserRole) => void;
  onUpdateUser?: (updatedUserData: Partial<User> & { id: string }) => void;
  onAddUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  onDeleteUser?: (userId: string) => void;
  onAddQuery?: (queryData: { title: string; description: string; budget: number; location: string; buyerId?: string; buyerName?: string }) => void;
  onDeleteQuery?: (queryId: string) => void;
  onSendBroadcast: (targetRole: UserRole | 'All', title: string, message: string) => void;
  onResetDatabase: () => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  currentView: string;
  notifications: any[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  onUploadDocument?: (doc: {
    fileName: string;
    fileCategory: DocumentCategory;
    fileSize: string;
    sharedWith: ('All Team' | UserRole)[];
    notes?: string;
  }) => void;
  onUpdateSharing?: (docId: string, sharedWith: ('All Team' | UserRole)[]) => void;
  onUpdateStatus?: (docId: string, status: 'Shared' | 'Under Review' | 'Verified' | 'Requires Update', notes?: string) => void;
  onDeleteDocument?: (docId: string) => void;
  onApproveNextStage?: (queryId: string, notes?: string) => void;
  onSetBuyerStage?: (queryId: string, targetStageIndex: number) => void;
  onToggleMilestone?: (queryId: string, milestoneId: string) => void;
}

// Internal structures for custom menus
interface PropertyListingItem {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  status: 'Listed' | 'Under Offer' | 'Settled';
  agent: string;
}

interface InsurancePolicy {
  id: string;
  buyerName: string;
  propertyTitle: string;
  provider: string;
  premium: number;
  status: 'Active' | 'Pending Approval' | 'Expired';
}

interface MoverSchedule {
  id: string;
  buyerName: string;
  companyName: string;
  moveDate: string;
  cost: number;
  status: 'Booked' | 'In Progress' | 'Completed';
}

interface FurniturePlan {
  id: string;
  buyerName: string;
  style: string;
  budget: number;
  status: 'Designing' | 'Ordering' | 'Installed';
  items: string[];
}

interface EstateAgent {
  id: string;
  name: string;
  agency: string;
  phone: string;
  deals: number;
}

export default function SuperAdminDashboard({
  currentUser,
  users,
  queries,
  activityLogs,
  documents = [],
  onUpdateUserRole,
  onUpdateUser,
  onAddUser,
  onDeleteUser,
  onAddQuery,
  onDeleteQuery,
  onSendBroadcast,
  onResetDatabase,
  onNavigate,
  onLogout,
  currentView,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  onUploadDocument,
  onUpdateSharing,
  onUpdateStatus,
  onDeleteDocument,
  onApproveNextStage,
  onSetBuyerStage,
  onToggleMilestone
}: SuperAdminDashboardProps) {
  // Active menu tracking
  const [activeMenu, setActiveMenu] = useState<
    | 'users'
    | 'property_listing'
    | 'enquiry'
    | 'mortgage'
    | 'document'
    | 'real_estate_agent'
    | 'lawyer'
    | 'settlement'
    | 'insurance'
    | 'mover_coordination'
    | 'furnisher'
    | 'settled'
    | 'analytics'
    | 'notifications'
  >('users');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedJourneyQueryId, setSelectedJourneyQueryId] = useState<string>('');
  const [stageApprovalNote, setStageApprovalNote] = useState<string>('');

  const relevantNotifications = notifications.filter(notif => {
    if (!currentUser) return false;
    if (notif.recipientId === currentUser.id) return true;
    if (notif.recipientRole === currentUser.role) return true;
    return false;
  });
  const unreadCount = relevantNotifications.filter(n => !n.isRead).length;

  const [userSearch, setUserSearch] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Home Buyer');
  const [newUserPhone, setNewUserPhone] = useState('');

  // State for Editing User Directory Records
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('Home Buyer');
  const [editPhone, setEditPhone] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editProfileCompleted, setEditProfileCompleted] = useState(true);
  const [editBuyerBudget, setEditBuyerBudget] = useState<number | string>(500000);
  const [editBuyerLocation, setEditBuyerLocation] = useState('Auckland, NZ');
  const [editBuyerPropertyType, setEditBuyerPropertyType] = useState('Standalone house');
  const [editBuyerTimeline, setEditBuyerTimeline] = useState('1-3 months');
  const [userEditToast, setUserEditToast] = useState<string | null>(null);

  const handleStartEditUser = (user: User) => {
    setEditingUser(user);
    setEditName(user.name || '');
    setEditEmail(user.email || '');
    setEditRole(user.role);
    setEditPhone(user.phone || '');
    setEditPassword(user.password || '');
    setEditProfileCompleted(user.profileCompleted ?? true);
    if (user.buyerDetails) {
      setEditBuyerBudget(user.buyerDetails.budget || 500000);
      setEditBuyerLocation(user.buyerDetails.desiredLocation || 'Auckland, NZ');
      setEditBuyerPropertyType(user.buyerDetails.propertyType || 'Standalone house');
      setEditBuyerTimeline(user.buyerDetails.preferredTimeline || '1-3 months');
    } else {
      setEditBuyerBudget(500000);
      setEditBuyerLocation('Auckland, NZ');
      setEditBuyerPropertyType('Standalone house');
      setEditBuyerTimeline('1-3 months');
    }
    setShowEditUserModal(true);
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editName.trim() || !editEmail.trim()) {
      alert('User Name and Email are required.');
      return;
    }

    const updatedData: Partial<User> & { id: string } = {
      id: editingUser.id,
      name: editName.trim(),
      email: editEmail.trim().toLowerCase(),
      role: editRole,
      phone: editPhone.trim() || undefined,
      profileCompleted: editProfileCompleted,
      ...(editPassword.trim() ? { password: editPassword.trim() } : {})
    };

    if (editRole === 'Home Buyer') {
      updatedData.buyerDetails = {
        budget: Number(editBuyerBudget) || 500000,
        desiredLocation: editBuyerLocation.trim() || 'Auckland, NZ',
        propertyType: editBuyerPropertyType.trim() || 'Standalone house',
        preferredTimeline: editBuyerTimeline.trim() || '1-3 months',
        mortgagePreApproved: editingUser.buyerDetails?.mortgagePreApproved ?? false,
        hasLawyerAssigned: editingUser.buyerDetails?.hasLawyerAssigned ?? false
      };
    }

    if (onUpdateUser) {
      onUpdateUser(updatedData);
    } else if (onUpdateUserRole && editRole !== editingUser.role) {
      onUpdateUserRole(editingUser.id, editRole);
    }

    setUserEditToast(`Successfully modified record for ${editName.trim()} (${editRole})`);
    setTimeout(() => setUserEditToast(null), 4000);
    setShowEditUserModal(false);
    setEditingUser(null);
  };

  // SettleMate simulated database additions
  const [properties, setProperties] = useState<PropertyListingItem[]>([
    { id: 'prop-1', title: 'Oakwood Residences', address: '124 Oakwood Ave, Auckland', price: 620000, beds: 3, baths: 2, status: 'Listed', agent: 'Marcus Sterling' },
    { id: 'prop-2', title: 'Waterfront Quay Loft', address: '88 Harbour Street, Wellington', price: 890000, beds: 2, baths: 2, status: 'Under Offer', agent: 'Sophia Chen' },
    { id: 'prop-3', title: 'Downtown Modern Heights', address: '402 High Street, Christchurch', price: 470000, beds: 1, baths: 1, status: 'Settled', agent: 'Sophia Chen' },
    { id: 'prop-4', title: 'The Pines Family Estate', address: '15 Pinecrest Drive, Hamilton', price: 750000, beds: 4, baths: 3, status: 'Listed', agent: 'James Peterson' }
  ]);

  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([
    { id: 'ins-1', buyerName: 'Alex Rivera', propertyTitle: 'Oakwood Residences', provider: 'AMI Premium Cover', premium: 1450, status: 'Active' },
    { id: 'ins-2', buyerName: 'Sarah Jenkins', propertyTitle: 'Waterfront Quay Loft', provider: 'AA Building Insurance', premium: 1890, status: 'Pending Approval' }
  ]);

  const [movers, setMovers] = useState<MoverSchedule[]>([
    { id: 'mov-1', buyerName: 'Alex Rivera', companyName: 'Swift Move Logistics', moveDate: '2026-08-15', cost: 1250, status: 'Booked' },
    { id: 'mov-2', buyerName: 'Sarah Jenkins', companyName: 'Metro Relocations Co.', moveDate: '2026-09-02', cost: 1600, status: 'In Progress' }
  ]);

  const [furniturePlans, setFurniturePlans] = useState<FurniturePlan[]>([
    { id: 'furn-1', buyerName: 'Alex Rivera', style: 'Scandinavian Minimalist', budget: 15000, status: 'Ordering', items: ['Oak Dining Table', 'Fabric Sofa Suite', 'Warm Ambient Lamps'] },
    { id: 'furn-2', buyerName: 'Marcus Vance', style: 'Industrial Loft Staging', budget: 22000, status: 'Installed', items: ['Metal Accent Coffee Table', 'Leather Lounge', 'Concrete Desk'] }
  ]);

  const [estateAgents, setEstateAgents] = useState<EstateAgent[]>([
    { id: 'agt-1', name: 'Marcus Sterling', agency: 'Elite Realty New Zealand', phone: '+64 21 555 901', deals: 4 },
    { id: 'agt-2', name: 'Sophia Chen', agency: 'Horizon Sourcing Partners', phone: '+64 21 555 234', deals: 2 },
    { id: 'agt-3', name: 'James Peterson', agency: 'Apex Christchurch Properties', phone: '+64 21 555 449', deals: 1 }
  ]);

  const [simulatedRates, setSimulatedRates] = useState({
    fixedRate: 5.75,
    variableRate: 6.15,
    minimumDepositPct: 10
  });

  // State for forms
  const [newPropTitle, setNewPropTitle] = useState('');
  const [newPropAddress, setNewPropAddress] = useState('');
  const [newPropPrice, setNewPropPrice] = useState('');
  const [newPropBeds, setNewPropBeds] = useState('3');
  const [newPropBaths, setNewPropBaths] = useState('2');
  const [newPropAgent, setNewPropAgent] = useState('Marcus Sterling');

  const [newInsBuyer, setNewInsBuyer] = useState('');
  const [newInsProp, setNewInsProp] = useState('');
  const [newInsProvider, setNewInsProvider] = useState('AMI Premium Cover');
  const [newInsPremium, setNewInsPremium] = useState('');

  const [newMoverBuyer, setNewMoverBuyer] = useState('');
  const [newMoverCompany, setNewMoverCompany] = useState('');
  const [newMoverDate, setNewMoverDate] = useState('');
  const [newMoverCost, setNewMoverCost] = useState('');

  const [newFurnBuyer, setNewFurnBuyer] = useState('');
  const [newFurnStyle, setNewFurnStyle] = useState('Scandinavian Minimalist');
  const [newFurnBudget, setNewFurnBudget] = useState('');

  // Form state for Super Admin creating Property Enquiries / Requests
  const [newQueryTitle, setNewQueryTitle] = useState('');
  const [newQueryBuyerId, setNewQueryBuyerId] = useState('');
  const [newQueryBudget, setNewQueryBudget] = useState('');
  const [newQueryLocation, setNewQueryLocation] = useState('');
  const [newQueryDesc, setNewQueryDesc] = useState('');

  const handleAdminCreateQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQueryTitle || !newQueryBudget || !newQueryLocation) return;
    const selectedBuyer = users.find(u => u.id === newQueryBuyerId) || users.find(u => u.role === 'Home Buyer') || currentUser;
    onAddQuery?.({
      title: newQueryTitle,
      description: newQueryDesc || `Property request created by Super Admin for ${selectedBuyer?.name || 'Home Buyer'}`,
      budget: Number(newQueryBudget),
      location: newQueryLocation,
      buyerId: selectedBuyer?.id,
      buyerName: selectedBuyer?.name
    });
    setNewQueryTitle('');
    setNewQueryBuyerId('');
    setNewQueryBudget('');
    setNewQueryLocation('');
    setNewQueryDesc('');
  };

  // Status counters for fast widgets
  const totalListedValue = properties.reduce((acc, curr) => acc + curr.price, 0);
  const activeQueries = queries.filter(q => q.status !== 'Completed' && q.status !== 'Rejected');
  const settledQueries = queries.filter(q => q.status === 'Completed');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    
    onAddUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      phone: newUserPhone || undefined,
      profileCompleted: true,
      buyerDetails: newUserRole === 'Home Buyer' ? {
        budget: 500000,
        desiredLocation: 'Auckland, NZ',
        propertyType: 'Standalone house',
        mortgagePreApproved: false,
        hasLawyerAssigned: false,
        preferredTimeline: '3-6 Months'
      } : undefined
    });

    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setShowAddUserModal(false);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropTitle || !newPropAddress || !newPropPrice) return;
    const newProp: PropertyListingItem = {
      id: `prop-${Date.now()}`,
      title: newPropTitle,
      address: newPropAddress,
      price: Number(newPropPrice),
      beds: Number(newPropBeds),
      baths: Number(newPropBaths),
      status: 'Listed',
      agent: newPropAgent
    };
    setProperties([newProp, ...properties]);
    setNewPropTitle('');
    setNewPropAddress('');
    setNewPropPrice('');
  };

  const handleAddInsurance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInsBuyer || !newInsProp || !newInsPremium) return;
    const newIns: InsurancePolicy = {
      id: `ins-${Date.now()}`,
      buyerName: newInsBuyer,
      propertyTitle: newInsProp,
      provider: newInsProvider,
      premium: Number(newInsPremium),
      status: 'Pending Approval'
    };
    setInsurancePolicies([newIns, ...insurancePolicies]);
    setNewInsBuyer('');
    setNewInsProp('');
    setNewInsPremium('');
  };

  const handleAddMover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMoverBuyer || !newMoverCompany || !newMoverDate) return;
    const newMov: MoverSchedule = {
      id: `mov-${Date.now()}`,
      buyerName: newMoverBuyer,
      companyName: newMoverCompany,
      moveDate: newMoverDate,
      cost: Number(newMoverCost) || 800,
      status: 'Booked'
    };
    setMovers([newMov, ...movers]);
    setNewMoverBuyer('');
    setNewMoverCompany('');
    setNewMoverDate('');
    setNewMoverCost('');
  };

  const handleAddFurniture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFurnBuyer || !newFurnBudget) return;
    const newFurn: FurniturePlan = {
      id: `furn-${Date.now()}`,
      buyerName: newFurnBuyer,
      style: newFurnStyle,
      budget: Number(newFurnBudget),
      status: 'Designing',
      items: ['Primary Living Sofa Suite', 'Ambient Dining Pendant']
    };
    setFurniturePlans([newFurn, ...furniturePlans]);
    setNewFurnBuyer('');
    setNewFurnBudget('');
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-50 text-red-700 border border-red-200';
      case 'Mortgage Adviser': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Property Lawyer': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Real Estate Agent': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Home Buyer': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f6f7f7] font-sans text-[#3c434a] relative overflow-x-hidden" id="admin-layout">
      
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/55 z-40 md:hidden animate-fade-in" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}
      
      {/* -------------------- ADMIN LEFT SIDEBAR -------------------- */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1d2327] text-[#f0f0f1] flex flex-col flex-shrink-0 h-screen max-h-screen select-none border-r border-[#101416] transition-transform duration-300 overflow-y-auto overscroll-contain md:translate-x-0 md:static md:flex md:h-auto md:max-h-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} 
        id="admin-sidebar"
      >
        {/* Brand Banner */}
        <div className="p-4 bg-[#1d2327] border-b border-[#101416] flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#de5d26] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
          <div>
            <span className="font-black text-white text-base tracking-tight block">SettleMate</span>
            <span className="text-[10px] text-[#de5d26] font-semibold tracking-tight block">One Journey. One Coordinator.</span>
          </div>
        </div>

        {/* Sidebar Title */}
        <div className="px-4 py-2.5 text-[11px] text-[#787c82] uppercase font-bold tracking-wider">
          Main Cockpit
        </div>

        {/* 13 Menus strictly ordered */}
        <nav className="flex-1 space-y-0.5 text-[13px] font-semibold" id="nav-menu">
          
          {/* 1. Users */}
          <button
            onClick={() => setActiveMenu('users')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'users' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-users"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>1. Users Directory</span>
          </button>

          {/* 2. Property Listing */}
          <button
            onClick={() => setActiveMenu('property_listing')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'property_listing' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-properties"
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span>2. Property Listing</span>
          </button>

          {/* 3. Enquiry */}
          <button
            onClick={() => setActiveMenu('enquiry')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'enquiry' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-enquiries"
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span>3. Enquiry Desk</span>
          </button>

          {/* 4. Mortgage */}
          <button
            onClick={() => setActiveMenu('mortgage')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'mortgage' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-mortgage"
          >
            <Percent className="w-4 h-4 flex-shrink-0" />
            <span>4. Mortgage Desk</span>
          </button>

          {/* 5. Document */}
          <button
            onClick={() => setActiveMenu('document')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'document' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-documents"
          >
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span>5. Document Vault</span>
          </button>

          {/* 6. Real Estate Agent */}
          <button
            onClick={() => setActiveMenu('real_estate_agent')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'real_estate_agent' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-agent"
          >
            <UserCheck className="w-4 h-4 flex-shrink-0" />
            <span>6. Real Estate Agent</span>
          </button>

          {/* 7. Lawyer */}
          <button
            onClick={() => setActiveMenu('lawyer')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'lawyer' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-lawyers"
          >
            <Gavel className="w-4 h-4 flex-shrink-0" />
            <span>7. Lawyer Panel</span>
          </button>

          {/* 8. Settlement */}
          <button
            onClick={() => setActiveMenu('settlement')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'settlement' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-settlements"
          >
            <Handshake className="w-4 h-4 flex-shrink-0" />
            <span>8. Settlement</span>
          </button>

          {/* 9. Insurance */}
          <button
            onClick={() => setActiveMenu('insurance')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'insurance' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-insurance"
          >
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>9. Insurance Covers</span>
          </button>

          {/* 10. Mover Coordination */}
          <button
            onClick={() => setActiveMenu('mover_coordination')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'mover_coordination' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-movers"
          >
            <Truck className="w-4 h-4 flex-shrink-0" />
            <span>10. Mover Coordination</span>
          </button>

          {/* 11. Furnisher */}
          <button
            onClick={() => setActiveMenu('furnisher')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'furnisher' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-furnisher"
          >
            <Armchair className="w-4 h-4 flex-shrink-0" />
            <span>11. Furnisher Desk</span>
          </button>

          {/* 12. Settled */}
          <button
            onClick={() => setActiveMenu('settled')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'settled' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-settled"
          >
            <CheckSquare className="w-4 h-4 flex-shrink-0" />
            <span>12. Settled Completed</span>
          </button>

          {/* 13. Analytics */}
          <button
            onClick={() => {
              setActiveMenu('analytics');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'analytics' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-analytics"
          >
            <BarChart3 className="w-4 h-4 flex-shrink-0" />
            <span>13. Analytics Logs</span>
          </button>

          {/* Divider */}
          <div className="border-t border-[#1a1d20] my-2" />

          {/* My Profile */}
          <button
            onClick={() => {
              onNavigate('profile');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              currentView === 'profile' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-profile"
          >
            <UserIcon className="w-4 h-4 flex-shrink-0" />
            <span>My Profile</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              setActiveMenu('notifications');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition cursor-pointer border-l-4 ${
              activeMenu === 'notifications' 
                ? 'bg-[#de5d26] text-white border-white' 
                : 'border-transparent text-[#f0f0f1]/90 hover:bg-[#2c3338] hover:text-[#72aee6]'
            }`}
            id="menu-btn-notifications"
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-4 h-4 flex-shrink-0" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full" id="sidebar-notif-badge">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Log Out */}
          <button
            onClick={() => {
              onLogout();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-left transition cursor-pointer border-l-4 border-transparent text-[#f0f0f1]/90 hover:bg-red-950/40 hover:text-red-400"
            id="menu-btn-logout"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Log Out</span>
          </button>

        </nav>

        {/* Footer Area with Reset Database action */}
        <div className="p-3 bg-[#111315] border-t border-[#1a1d20] flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="truncate">Howdy, {currentUser.name.split(' ')[0]}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <button
            onClick={onResetDatabase}
            className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
            id="reset-db-btn"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Reset Database Default</span>
          </button>
          <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-500 pt-1.5 border-t border-[#1a1d20]">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('csa')}
              className="hover:text-[#de5d26] text-slate-400 font-semibold underline cursor-pointer"
              title="Customer Service Agreement"
            >
              CSA
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('disclaimer')}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </aside>

      {/* -------------------- MAIN WORKSPACE CONTENT -------------------- */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden" id="admin-workspace">
        
        {/* Top Admin Header Bar */}
        <header className="h-12 bg-white border-b border-[#dcdcde] px-6 flex items-center justify-between" id="top-header-bar">
          <div className="flex items-center space-x-2">
            {/* Mobile menu toggle (three lines / hamburger icon) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-md hover:bg-slate-100 text-[#1d2327] transition cursor-pointer mr-1"
              id="admin-sidebar-mobile-toggle"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[12px] font-bold text-slate-400 font-mono">ADMIN PORTAL</span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-[#2271b1] font-semibold bg-[#f0f6fc] px-2 py-0.5 rounded border border-[#d2e3f7]">
              Current Role: Super Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-bold text-slate-500">System Time (NZST)</span>
            <span className="text-xs font-mono bg-slate-100 text-slate-800 px-2 py-1 rounded">2026-07-07 13:38</span>
          </div>
        </header>

        {/* Main Content View Dispatcher */}
        <div className="p-6 sm:p-8 flex-grow space-y-6" id="content-pane">
          
          {/* Page Header Title and "Add New" pattern */}
          <div className="flex items-center justify-between border-b border-[#c3c4c7] pb-3" id="title-area">
            <div className="flex items-center">
              <h1 className="text-[23px] font-normal font-sans text-[#1d2327]">
                {activeMenu === 'users' && 'Users Directory'}
                {activeMenu === 'property_listing' && 'Property Sourcing Listings'}
                {activeMenu === 'enquiry' && 'Buyer Enquiry Pipelines'}
                {activeMenu === 'mortgage' && 'Mortgage Assessment Desk'}
                {activeMenu === 'document' && 'Document Vault Manager'}
                {activeMenu === 'real_estate_agent' && 'Partner Estate Agents'}
                {activeMenu === 'lawyer' && 'Legal Solicitor Accounts'}
                {activeMenu === 'settlement' && 'Financial Settlement Desk'}
                {activeMenu === 'insurance' && 'Policy Pre-settlement Cover'}
                {activeMenu === 'mover_coordination' && 'Mover Coordination Checklist'}
                {activeMenu === 'furnisher' && 'Interior Styling & Staging'}
                {activeMenu === 'settled' && 'Transactions Settled'}
                {activeMenu === 'analytics' && 'Security Audit & Analytics Stream'}
                {activeMenu === 'notifications' && 'System Notifications'}
              </h1>
              
              {/* Add New Quick Button Style */}
              {activeMenu === 'users' && (
                <button
                  onClick={() => setShowAddUserModal(!showAddUserModal)}
                  className="ml-4 px-2.5 py-1 text-[11px] font-bold text-[#2271b1] bg-white border border-[#2271b1] hover:bg-[#f0f6fc] rounded transition cursor-pointer"
                  id="add-user-btn"
                >
                  {showAddUserModal ? 'Collapse Form' : 'Add New User'}
                </button>
              )}
            </div>

            {/* Quick Stats Banner inside Admin view */}
            <div className="text-[11px] text-slate-500 font-semibold flex items-center space-x-3 bg-white px-3 py-1.5 rounded border border-[#dcdcde] shadow-2xs">
              <span>Total Listings: <strong className="text-slate-900">{properties.length}</strong></span>
              <span>•</span>
              <span>Open Enquiries: <strong className="text-[#de5d26]">{activeQueries.length}</strong></span>
              <span>•</span>
              <span>Total Settled: <strong className="text-emerald-600">{settledQueries.length}</strong></span>
            </div>
          </div>

          {/* Style Colored Callout Notice */}
          <div className="bg-white border-l-4 border-[#de5d26] p-4 shadow-2xs text-xs space-y-1 rounded-r-lg" id="notice-card">
            <p className="font-bold text-[#1d2327]">Administrator Workspace Activated</p>
            <p className="text-slate-500">
              You are signed in as SettleMate's Chief Administrator. All modifications to roles, lending standards, property matching indexes, and solicitor vaults are tracked in the real-time compliance audit pipeline.
            </p>
          </div>

          {/* -------------------- VIEW 1: USERS -------------------- */}
          {activeMenu === 'users' && (
            <div className="space-y-6 animate-fade-in" id="view-users">

              {/* Edit Feedback Toast */}
              {userEditToast && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-md text-xs font-semibold flex items-center justify-between shadow-xs animate-slide-in" id="user-edit-toast">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{userEditToast}</span>
                  </div>
                  <button onClick={() => setUserEditToast(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Edit User Modal */}
              {showEditUserModal && editingUser && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="edit-user-modal">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/80 rounded-t-xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                          <Edit3 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">Modify User Directory Record</h3>
                          <p className="text-xs text-slate-500">Edit account credentials, role permissions, and profile configurations for <span className="font-semibold text-slate-700">{editingUser.name}</span></p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowEditUserModal(false);
                          setEditingUser(null);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                        id="close-edit-user-modal-btn"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveEditUser} className="p-6 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Full Legal Name *</label>
                          <input
                            type="text"
                            required
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-[#de5d26] focus:ring-1 focus:ring-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                            id="edit-user-name-input"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Email Address (Login ID) *</label>
                          <input
                            type="email"
                            required
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-[#de5d26] focus:ring-1 focus:ring-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                            id="edit-user-email-input"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Security Role Tier *</label>
                          <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value as UserRole)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-[#de5d26] focus:ring-1 focus:ring-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                            id="edit-user-role-select"
                          >
                            <option value="Home Buyer">Home Buyer</option>
                            <option value="Mortgage Adviser">Mortgage Adviser</option>
                            <option value="Property Lawyer">Property Lawyer</option>
                            <option value="Real Estate Agent">Real Estate Agent</option>
                            <option value="Super Admin">Super Admin</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="+64 21 000 0000"
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-[#de5d26] focus:ring-1 focus:ring-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs font-mono"
                            id="edit-user-phone-input"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Password / Security Key</label>
                          <input
                            type="text"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="Enter new password to reset"
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-[#de5d26] focus:ring-1 focus:ring-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs font-mono"
                            id="edit-user-password-input"
                          />
                          <p className="text-[10px] text-slate-500 mt-1">Super Admin can modify or reset user's login password directly.</p>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Onboarding / Profile Status</label>
                          <select
                            value={editProfileCompleted ? 'completed' : 'pending'}
                            onChange={(e) => setEditProfileCompleted(e.target.value === 'completed')}
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-[#de5d26] focus:ring-1 focus:ring-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                            id="edit-user-status-select"
                          >
                            <option value="completed">100% Completed (Full Access)</option>
                            <option value="pending">Pending Details (Requires Onboarding)</option>
                          </select>
                        </div>
                      </div>

                      {/* If role is Home Buyer, show Buyer Sourcing Details */}
                      {editRole === 'Home Buyer' && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
                            <Home className="w-3.5 h-3.5 mr-1.5 text-[#de5d26]" />
                            Home Buyer Criteria & Parameters
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block text-slate-600 mb-1 font-semibold">Budget Target ($ NZD)</label>
                              <input
                                type="number"
                                value={editBuyerBudget}
                                onChange={(e) => setEditBuyerBudget(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800 text-xs"
                                id="edit-buyer-budget-input"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 mb-1 font-semibold">Target Location / Suburb</label>
                              <input
                                type="text"
                                value={editBuyerLocation}
                                onChange={(e) => setEditBuyerLocation(e.target.value)}
                                placeholder="e.g. Auckland, Wellington, Christchurch"
                                className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800 text-xs"
                                id="edit-buyer-location-input"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 mb-1 font-semibold">Property Type</label>
                              <select
                                value={editBuyerPropertyType}
                                onChange={(e) => setEditBuyerPropertyType(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800 text-xs"
                                id="edit-buyer-proptype-select"
                              >
                                <option value="Standalone house">Standalone house</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Apartment / Unit">Apartment / Unit</option>
                                <option value="Lifestyle section">Lifestyle section</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-slate-600 mb-1 font-semibold">Preferred Purchase Timeline</label>
                              <select
                                value={editBuyerTimeline}
                                onChange={(e) => setEditBuyerTimeline(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded bg-white text-slate-800 text-xs"
                                id="edit-buyer-timeline-select"
                              >
                                <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                                <option value="1-3 Months">1-3 Months</option>
                                <option value="3-6 Months">3-6 Months</option>
                                <option value="6-12 Months">6-12 Months</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <span className="text-[11px] text-slate-400 font-mono">User Record ID: {editingUser.id}</span>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowEditUserModal(false);
                              setEditingUser(null);
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#de5d26] hover:bg-[#c84617] text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer flex items-center"
                            id="save-edit-user-btn"
                          >
                            <Check className="w-4 h-4 mr-1.5" />
                            Save Modifications
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Custom Add User form if triggered */}
              {showAddUserModal && (
                <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4 animate-slide-in" id="add-user-form-panel">
                  <h3 className="text-sm font-bold text-slate-800 border-b border-[#f0f0f1] pb-2">Add New System Account</h3>
                  <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">User Name</label>
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:border-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="sarah@settlemate.co.nz"
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:border-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Assigned System Role</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:border-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                      >
                        <option value="Home Buyer">Home Buyer</option>
                        <option value="Mortgage Adviser">Mortgage Adviser</option>
                        <option value="Property Lawyer">Property Lawyer</option>
                        <option value="Real Estate Agent">Real Estate Agent</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Phone Number</label>
                      <input
                        type="text"
                        value={newUserPhone}
                        onChange={(e) => setNewUserPhone(e.target.value)}
                        placeholder="+64 21 000 1122"
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:border-[#de5d26] focus:outline-none bg-white text-slate-800 text-xs"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddUserModal(false)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#de5d26] hover:bg-[#c84617] text-white rounded text-xs font-semibold transition"
                      >
                        Create User Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Table filter strip */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 border border-[#c3c4c7] rounded-md gap-4">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-[#2271b1] cursor-pointer hover:underline font-bold">All ({users.length})</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600">Advisers ({users.filter(u => u.role === 'Mortgage Adviser').length})</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600">Buyers ({users.filter(u => u.role === 'Home Buyer').length})</span>
                </div>
                
                {/* Search */}
                <div className="relative max-w-xs w-full">
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search Users..."
                    className="w-full pl-8 pr-3 py-1.5 border border-[#c3c4c7] rounded bg-white text-xs focus:outline-none focus:border-[#de5d26]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Main User Table */}
              <div className="bg-white border border-[#c3c4c7] rounded shadow-2xs overflow-hidden">
                <table className="min-w-full divide-y divide-[#c3c4c7] text-left text-xs">
                  <thead className="bg-[#f0f0f1] text-[#2c3338] font-bold">
                    <tr>
                      <th className="px-5 py-3 font-semibold border-b border-[#c3c4c7]">User Profile</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#c3c4c7]">Role Tier</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#c3c4c7]">Phone</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#c3c4c7]">Onboarding Check</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#c3c4c7]">Access Override</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#c3c4c7] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1] bg-white">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5 flex items-center space-x-3 cursor-pointer" onClick={() => handleStartEditUser(u)}>
                          {u.avatarUrl ? (
                            <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover border hover:opacity-80 transition" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-100 border text-slate-600 font-bold flex items-center justify-center hover:bg-slate-200 transition">
                              {u.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#2271b1] hover:underline block">{u.name}</span>
                            <span className="text-[10px] text-slate-400">{u.email}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRoleColor(u.role)}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 font-mono">{u.phone || 'N/A'}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center text-[10px] font-bold ${u.profileCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            {u.profileCompleted ? '100% Completed' : 'Pending Details'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <select
                            value={u.role}
                            onChange={(e) => onUpdateUserRole(u.id, e.target.value as UserRole)}
                            className="p-1 border border-slate-300 rounded text-[10px] focus:border-[#de5d26] focus:outline-none bg-white text-slate-800"
                            id={`role-override-select-${u.id}`}
                          >
                            <option value="Home Buyer">Home Buyer</option>
                            <option value="Mortgage Adviser">Mortgage Adviser</option>
                            <option value="Property Lawyer">Property Lawyer</option>
                            <option value="Real Estate Agent">Real Estate Agent</option>
                            <option value="Super Admin">Super Admin</option>
                          </select>
                        </td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => handleStartEditUser(u)}
                            title="Edit & Modify User Details"
                            className="p-1.5 text-[#2271b1] hover:text-[#135e96] hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded transition cursor-pointer inline-flex items-center text-xs font-semibold"
                            id={`edit-user-btn-${u.id}`}
                          >
                            <Edit3 className="w-3.5 h-3.5 mr-1" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (u.id === currentUser.id) {
                                alert('You cannot delete your active Super Admin session account.');
                                return;
                              }
                              if (confirm(`Are you sure you want to delete user account "${u.name}" (${u.role})?`)) {
                                onDeleteUser?.(u.id);
                              }
                            }}
                            title="Delete User Account"
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-transparent hover:border-red-200 rounded transition cursor-pointer inline-flex items-center text-xs font-semibold"
                            id={`delete-user-btn-${u.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 2: PROPERTY LISTING -------------------- */}
          {activeMenu === 'property_listing' && (
            <div className="space-y-6 animate-fade-in" id="view-properties">
              {/* Form to add listing */}
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-[#f0f0f1] pb-2 mb-3">
                  Publish New Property Sourcing Listing
                </h3>
                <form onSubmit={handleAddProperty} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1">Property Name / Title</label>
                    <input
                      type="text"
                      required
                      value={newPropTitle}
                      onChange={(e) => setNewPropTitle(e.target.value)}
                      placeholder="E.g. Oakwood Residences"
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-slate-600 mb-1">Full Physical Address</label>
                    <input
                      type="text"
                      required
                      value={newPropAddress}
                      onChange={(e) => setNewPropAddress(e.target.value)}
                      placeholder="E.g. 124 Oakwood Ave, Auckland"
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">List Price ($NZD)</label>
                    <input
                      type="number"
                      required
                      value={newPropPrice}
                      onChange={(e) => setNewPropPrice(e.target.value)}
                      placeholder="E.g. 620000"
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Bedrooms</label>
                    <select
                      value={newPropBeds}
                      onChange={(e) => setNewPropBeds(e.target.value)}
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    >
                      <option value="1">1 Bed</option>
                      <option value="2">2 Bed</option>
                      <option value="3">3 Bed</option>
                      <option value="4">4 Bed</option>
                      <option value="5">5 Bed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Bathrooms</label>
                    <select
                      value={newPropBaths}
                      onChange={(e) => setNewPropBaths(e.target.value)}
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    >
                      <option value="1">1 Bath</option>
                      <option value="2">2 Bath</option>
                      <option value="3">3 Bath</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Assigned Sourcing Agent</label>
                    <select
                      value={newPropAgent}
                      onChange={(e) => setNewPropAgent(e.target.value)}
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    >
                      {estateAgents.map(ag => (
                        <option key={ag.id} value={ag.name}>{ag.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end pt-1">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#de5d26] hover:bg-[#c84617] text-white text-xs font-bold rounded transition cursor-pointer"
                    >
                      Publish Property Listing
                    </button>
                  </div>
                </form>
              </div>

              {/* Table list of properties */}
              <div className="bg-white border border-[#c3c4c7] rounded shadow-2xs overflow-hidden">
                <table className="min-w-full divide-y divide-[#c3c4c7] text-left text-xs">
                  <thead className="bg-[#f0f0f1] text-[#2c3338] font-bold">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Listing Title</th>
                      <th className="px-5 py-3 font-semibold">Address</th>
                      <th className="px-5 py-3 font-semibold">Configuration</th>
                      <th className="px-5 py-3 font-semibold">Market Value</th>
                      <th className="px-5 py-3 font-semibold">Active Agent</th>
                      <th className="px-5 py-3 font-semibold">Listing Status</th>
                      <th className="px-5 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1] bg-white text-slate-700">
                    {properties.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5 font-bold text-[#2271b1]">{p.title}</td>
                        <td className="px-5 py-3.5 text-slate-500">{p.address}</td>
                        <td className="px-5 py-3.5 font-mono">{p.beds} Bed • {p.baths} Bath</td>
                        <td className="px-5 py-3.5 font-bold font-mono text-slate-800">
                          NZD ${(p.price).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 text-[#2271b1] font-semibold">{p.agent}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'Listed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            p.status === 'Under Offer' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete property listing "${p.title}"?`)) {
                                setProperties(prev => prev.filter(item => item.id !== p.id));
                              }
                            }}
                            title="Delete Property Listing"
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-transparent hover:border-red-200 rounded transition cursor-pointer inline-flex items-center text-xs font-semibold"
                            id={`delete-property-btn-${p.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 3: ENQUIRY -------------------- */}
          {activeMenu === 'enquiry' && (
            <div className="space-y-6 animate-fade-in" id="view-enquiries">
              {/* Form to Register New Buyer Property Inquiry */}
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-[#f0f0f1] pb-2 mb-3 flex items-center">
                  <PlusCircle className="w-4 h-4 mr-1.5 text-[#de5d26]" />
                  <span>Register New Buyer Property Request</span>
                </h3>
                <form onSubmit={handleAdminCreateQuery} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1">Buyer Applicant</label>
                    <select
                      value={newQueryBuyerId}
                      onChange={(e) => setNewQueryBuyerId(e.target.value)}
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    >
                      <option value="">-- Select Buyer Account --</option>
                      {users.filter(u => u.role === 'Home Buyer').map(b => (
                        <option key={b.id} value={b.id}>{b.name} ({b.email})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Request Title</label>
                    <input
                      type="text"
                      required
                      value={newQueryTitle}
                      onChange={(e) => setNewQueryTitle(e.target.value)}
                      placeholder="E.g. 4-Bed Architectural Home near Remuera"
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Target Budget ($ NZD)</label>
                    <input
                      type="number"
                      required
                      value={newQueryBudget}
                      onChange={(e) => setNewQueryBudget(e.target.value)}
                      placeholder="E.g. 1650000"
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Target Location / Suburb</label>
                    <input
                      type="text"
                      required
                      value={newQueryLocation}
                      onChange={(e) => setNewQueryLocation(e.target.value)}
                      placeholder="E.g. Remuera, Auckland, NZ"
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-3">
                    <label className="block text-slate-600 mb-1">Property Specifications / Notes</label>
                    <input
                      type="text"
                      value={newQueryDesc}
                      onChange={(e) => setNewQueryDesc(e.target.value)}
                      placeholder="E.g. Wants native bush garden views, double grammar zone..."
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white text-xs text-slate-800 focus:outline-none focus:border-[#de5d26]"
                    />
                  </div>
                  <div className="flex items-end pt-1">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#de5d26] hover:bg-[#c84617] text-white text-xs font-bold rounded transition cursor-pointer"
                    >
                      Create Property Inquiry
                    </button>
                  </div>
                </form>
              </div>

              {/* BUYER JOURNEY & STAGE APPROVAL CONTROL CENTER */}
              {(() => {
                const currentActiveQuery = queries.find(q => q.id === selectedJourneyQueryId) || queries[0];
                if (!currentActiveQuery) return null;

                const milestones = currentActiveQuery.milestones || [];
                const completedCount = milestones.filter(m => m.completed).length;
                const totalCount = milestones.length || 12;
                const progressPct = Math.round((completedCount / totalCount) * 100);
                const nextPendingStage = milestones.find(m => !m.completed);
                const nextPendingStageIndex = milestones.findIndex(m => !m.completed);

                return (
                  <div className="bg-white border-2 border-[#de5d26]/30 rounded-lg p-5 shadow-xs space-y-5" id="admin-journey-governance-panel">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#de5d26] animate-pulse"></span>
                          <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900 flex items-center">
                            Buyer Journey Stage Governance & Approval Center
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Review and officially approve buyer progress stages. New buyers start with Onboarding & Profile Completed (Stage 1); subsequent stages require Super Admin approval.
                        </p>
                      </div>

                      {/* Buyer Selector Strip */}
                      <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
                        <span className="text-[11px] font-bold text-slate-500 uppercase flex-shrink-0">Select Buyer:</span>
                        {queries.map((q) => {
                          const isSelected = (currentActiveQuery.id === q.id);
                          const qDone = (q.milestones || []).filter(m => m.completed).length;
                          return (
                            <button
                              key={q.id}
                              type="button"
                              onClick={() => setSelectedJourneyQueryId(q.id)}
                              className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
                                isSelected
                                  ? 'bg-[#de5d26] text-white shadow-xs font-bold'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              <span>{q.buyerName}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                {qDone}/12
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Buyer Journey Snapshot & Next Stage Quick Approval Banner */}
                    <div className="bg-gradient-to-r from-orange-50/70 via-amber-50/40 to-slate-50 border border-orange-200/80 rounded-lg p-4 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-900">Active Applicant:</span>
                            <span className="text-sm font-extrabold text-[#2271b1]">{currentActiveQuery.buyerName}</span>
                            <span className="text-xs text-slate-500">({currentActiveQuery.title})</span>
                          </div>
                          <div className="text-xs text-slate-600 mt-1 flex items-center space-x-3">
                            <span>Target: <strong className="text-slate-800">NZD ${currentActiveQuery.budget.toLocaleString()}</strong></span>
                            <span>•</span>
                            <span>Location: <strong className="text-slate-800">{currentActiveQuery.location}</strong></span>
                            <span>•</span>
                            <span>Overall Progress: <strong className="text-[#de5d26]">{completedCount} of {totalCount} Stages Verified ({progressPct}%)</strong></span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full md:w-56 space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                            <span>Stage Completion</span>
                            <span>{progressPct}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#de5d26] to-[#2D7048] transition-all duration-300 rounded-full"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Next Stage Approval Action Box */}
                      {nextPendingStage ? (
                        <div className="pt-2 border-t border-orange-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#de5d26] text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 shadow-xs">
                              {nextPendingStageIndex + 1}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                                <span>Awaiting Super Admin Approval:</span>
                                <span className="text-[#de5d26] underline font-extrabold">{nextPendingStage.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5">
                                {nextPendingStage.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Optional approval note to buyer..."
                              value={stageApprovalNote}
                              onChange={(e) => setStageApprovalNote(e.target.value)}
                              className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#de5d26] w-48 sm:w-56"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                onApproveNextStage?.(currentActiveQuery.id, stageApprovalNote);
                                setStageApprovalNote('');
                              }}
                              className="px-4 py-1.5 bg-[#2D7048] hover:bg-[#235838] text-white text-xs font-bold rounded shadow-xs transition cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
                              id={`admin-approve-stage-btn-${currentActiveQuery.id}`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Approve Stage {nextPendingStageIndex + 1}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-xs text-[#2D7048] font-bold">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-[#2D7048]" />
                            <span>All 12 Journey Stages have been officially approved and completed!</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onSetBuyerStage?.(currentActiveQuery.id, 0)}
                            className="text-slate-600 hover:text-slate-900 underline text-xs font-normal cursor-pointer"
                          >
                            Reset to Stage 1
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick Stage Jumper & Full 12-Milestone Interactive Matrix */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          12-Stage Journey Matrix & Governance Checklist
                        </h4>
                        <div className="flex items-center space-x-1 text-[11px] text-slate-500 font-medium">
                          <span>Click any stage below to toggle approval:</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {milestones.map((m, idx) => {
                          const isDone = m.completed;
                          const isNext = (nextPendingStageIndex === idx);

                          return (
                            <div
                              key={m.id || idx}
                              className={`p-3 rounded-lg border transition flex flex-col justify-between space-y-2 ${
                                isDone
                                  ? 'bg-emerald-50/40 border-emerald-200'
                                  : isNext
                                  ? 'bg-orange-50/60 border-orange-300 ring-1 ring-orange-200 shadow-2xs'
                                  : 'bg-slate-50/50 border-slate-200 opacity-80'
                              }`}
                            >
                              <div className="flex items-start justify-between space-x-2">
                                <div className="flex items-start space-x-2">
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5 ${
                                    isDone
                                      ? 'bg-[#2D7048] text-white'
                                      : isNext
                                      ? 'bg-[#de5d26] text-white'
                                      : 'bg-slate-200 text-slate-600'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <div className={`text-xs font-bold leading-tight ${isDone ? 'text-slate-900' : isNext ? 'text-slate-900' : 'text-slate-700'}`}>
                                      {m.title}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                                      {m.description}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                                <div>
                                  {isDone ? (
                                    <span className="text-[#2D7048] font-bold flex items-center">
                                      ✓ {m.updatedBy ? `Approved by ${m.updatedBy.replace(' (Super Admin)', '')}` : 'Verified'}
                                    </span>
                                  ) : isNext ? (
                                    <span className="text-[#de5d26] font-bold animate-pulse">
                                      ⏳ Next Pending Stage
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 font-medium">
                                      Pending Approval
                                    </span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => onToggleMilestone?.(currentActiveQuery.id, m.id)}
                                  className={`px-2 py-1 rounded font-bold cursor-pointer transition text-[10px] ${
                                    isDone
                                      ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                                      : 'bg-[#2D7048] hover:bg-[#235838] text-white shadow-2xs'
                                  }`}
                                  title={isDone ? 'Reopen Stage' : 'Approve Stage'}
                                >
                                  {isDone ? 'Reopen' : 'Approve'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Table of active enquiries / queries */}
              <div className="bg-white border border-[#c3c4c7] rounded shadow-2xs overflow-hidden">
                <table className="min-w-full divide-y divide-[#c3c4c7] text-left text-xs">
                  <thead className="bg-[#f0f0f1] text-[#2c3338] font-bold">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Buyer Applicant</th>
                      <th className="px-5 py-3 font-semibold">Enquiry Segment</th>
                      <th className="px-5 py-3 font-semibold">Target Budget</th>
                      <th className="px-5 py-3 font-semibold">Desired Location</th>
                      <th className="px-5 py-3 font-semibold">Stage Progress</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold text-right">Stage Governance & Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1] bg-white text-slate-700">
                    {queries.map((q) => {
                      const qDone = (q.milestones || []).filter(m => m.completed).length;
                      const qTotal = (q.milestones || []).length || 12;
                      const nextM = (q.milestones || []).find(m => !m.completed);
                      const isSelected = selectedJourneyQueryId === q.id || (!selectedJourneyQueryId && queries[0]?.id === q.id);

                      return (
                        <tr key={q.id} className={`hover:bg-slate-50/70 transition ${isSelected ? 'bg-orange-50/30' : ''}`}>
                          <td className="px-5 py-3.5 font-bold text-[#2271b1]">
                            <button
                              type="button"
                              onClick={() => setSelectedJourneyQueryId(q.id)}
                              className="hover:underline text-left cursor-pointer"
                            >
                              {q.buyerName}
                            </button>
                          </td>
                          <td className="px-5 py-3.5 text-slate-900">{q.title}</td>
                          <td className="px-5 py-3.5 font-bold font-mono">
                            NZD ${q.budget.toLocaleString()}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center">
                              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              <span>{q.location}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-[#2271b1]">{qDone} of {qTotal} Stages</span>
                                <span className="text-slate-500 font-mono">{Math.round((qDone/qTotal)*100)}%</span>
                              </div>
                              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#de5d26] rounded-full"
                                  style={{ width: `${Math.round((qDone/qTotal)*100)}%` }}
                                />
                              </div>
                              {nextM && (
                                <p className="text-[10px] text-slate-500 line-clamp-1">
                                  Next: <span className="font-semibold text-slate-700">{nextM.title}</span>
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-800 border">
                              {q.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right space-x-1.5">
                            {nextM && (
                              <button
                                type="button"
                                onClick={() => onApproveNextStage?.(q.id)}
                                className="px-2.5 py-1 bg-[#2D7048] hover:bg-[#235838] text-white text-[11px] font-bold rounded transition cursor-pointer inline-flex items-center shadow-xs"
                                title={`Approve next stage: ${nextM.title}`}
                              >
                                <Check className="w-3 h-3 mr-1 stroke-[3]" />
                                <span>Approve Next</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedJourneyQueryId(q.id)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded transition cursor-pointer inline-flex items-center border border-slate-300"
                            >
                              <span>Manage</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete property enquiry "${q.title}" for ${q.buyerName}?`)) {
                                  onDeleteQuery?.(q.id);
                                }
                              }}
                              title="Delete Property Enquiry"
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-transparent hover:border-red-200 rounded transition cursor-pointer inline-flex items-center text-xs font-semibold"
                              id={`delete-query-btn-${q.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Direct Super Admin Broadcaster integration right inside enquiry view */}
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
                  <BellRing className="w-4 h-4 mr-2 text-[#de5d26]" />
                  <span>Direct Advisory System Broadcaster</span>
                </h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const title = (form.elements.namedItem('broadcastTitle') as HTMLInputElement).value;
                    const message = (form.elements.namedItem('broadcastMessage') as HTMLTextAreaElement).value;
                    const target = (form.elements.namedItem('broadcastTarget') as HTMLSelectElement).value;
                    onSendBroadcast(target as any, title, message);
                    form.reset();
                    alert('Broadcast Alert Deployed!');
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1">Target Role Segment</label>
                      <select
                        name="broadcastTarget"
                        className="w-full p-2 border border-[#c3c4c7] rounded bg-white focus:outline-none"
                      >
                        <option value="All">All Portal Users</option>
                        <option value="Home Buyer">Home Buyers</option>
                        <option value="Mortgage Adviser">Mortgage Advisers</option>
                        <option value="Property Lawyer">Property Lawyers</option>
                        <option value="Real Estate Agent">Real Estate Agents</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Alert Title</label>
                      <input
                        type="text"
                        name="broadcastTitle"
                        required
                        placeholder="E.g. Critical: Lending Rule Updates NZ"
                        className="w-full p-2 border border-[#c3c4c7] rounded bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Notification Body</label>
                    <textarea
                      name="broadcastMessage"
                      required
                      rows={3}
                      placeholder="Enter the critical announcement message details..."
                      className="w-full p-2 border border-[#c3c4c7] rounded bg-white focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#de5d26] hover:bg-[#c84617] text-white text-xs font-bold rounded transition cursor-pointer"
                    >
                      Deploy Broadcast Alert
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 4: MORTGAGE -------------------- */}
          {activeMenu === 'mortgage' && (
            <div className="space-y-6 animate-fade-in" id="view-mortgage">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Interest rate manager */}
                <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Configure System Lending Rates</h3>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-slate-500 mb-1">Standard Fixed Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={simulatedRates.fixedRate}
                        onChange={(e) => setSimulatedRates({ ...simulatedRates, fixedRate: Number(e.target.value) })}
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Standard Variable Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={simulatedRates.variableRate}
                        onChange={(e) => setSimulatedRates({ ...simulatedRates, variableRate: Number(e.target.value) })}
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Minimum Deposit Percentage (%)</label>
                      <input
                        type="number"
                        value={simulatedRates.minimumDepositPct}
                        onChange={(e) => setSimulatedRates({ ...simulatedRates, minimumDepositPct: Number(e.target.value) })}
                        className="w-full p-2 border border-[#c3c4c7] rounded focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => alert('Lending rate parameters saved globally across SettleMate.')}
                      className="w-full py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded font-semibold text-xs transition cursor-pointer"
                    >
                      Update Bank Parameters
                    </button>
                  </div>
                </div>

                {/* Mortgage guidelines */}
                <div className="col-span-1 md:col-span-2 bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Current Pre-Approval Pipeline</h3>
                  <div className="overflow-x-auto text-xs text-slate-600">
                    <table className="min-w-full divide-y divide-slate-100 text-left">
                      <thead>
                        <tr className="text-slate-500 font-bold uppercase text-[10px]">
                          <th className="py-2">Buyer Name</th>
                          <th className="py-2">Pre-Approval Status</th>
                          <th className="py-2">Notes</th>
                          <th className="py-2 text-right">Adviser Checked</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f0f1]">
                        {queries.map(q => (
                          <tr key={q.id}>
                            <td className="py-2.5 font-bold text-slate-800">{q.buyerName}</td>
                            <td className="py-2.5">
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
                                {q.mortgageStatus || 'Awaiting Assessment'}
                              </span>
                            </td>
                            <td className="py-2.5 text-[11px] truncate max-w-xs">{q.mortgageNotes || 'No notes yet'}</td>
                            <td className="py-2.5 text-right text-slate-400 font-mono text-[10px]">
                              {q.mortgageAdviserId ? 'ID: Adviser' : 'Pending'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* -------------------- VIEW 5: DOCUMENT -------------------- */}
          {activeMenu === 'document' && (
            <div className="space-y-6 animate-fade-in" id="view-document">
              <DocumentVault
                currentUser={currentUser}
                documents={documents}
                onUploadDocument={onUploadDocument || (() => {})}
                onUpdateSharing={onUpdateSharing || (() => {})}
                onUpdateStatus={onUpdateStatus}
                onDeleteDocument={onDeleteDocument}
              />
            </div>
          )}

          {/* -------------------- VIEW 6: REAL ESTATE AGENT -------------------- */}
          {activeMenu === 'real_estate_agent' && (
            <div className="space-y-6 animate-fade-in" id="view-agents">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Active Real Estate Agents & Sourcing Partners</h3>
                
                <div className="overflow-x-auto text-xs">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead>
                      <tr className="bg-[#f0f0f1] font-bold">
                        <th className="p-2.5">Agent Name</th>
                        <th className="p-2.5">Agency Affiliation</th>
                        <th className="p-2.5">Contact Phone</th>
                        <th className="p-2.5">Managed Listings</th>
                        <th className="p-2.5 text-right">Commission Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1] text-slate-600">
                      {estateAgents.map(ag => (
                        <tr key={ag.id}>
                          <td className="p-2.5 font-bold text-slate-900">{ag.name}</td>
                          <td className="p-2.5">{ag.agency}</td>
                          <td className="p-2.5 font-mono">{ag.phone}</td>
                          <td className="p-2.5 font-bold text-[#2271b1]">{ag.deals} Properties</td>
                          <td className="p-2.5 text-right font-semibold text-emerald-600">Elite partner (1.5%)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 border rounded space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">Quick Partner Registration</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input type="text" placeholder="Agent Full Name" id="reg-agent-name" className="p-2 border rounded bg-white text-xs" />
                    <input type="text" placeholder="Agency" id="reg-agent-agency" className="p-2 border rounded bg-white text-xs" />
                    <button
                      onClick={() => {
                        const nameVal = (document.getElementById('reg-agent-name') as HTMLInputElement)?.value;
                        const agyVal = (document.getElementById('reg-agent-agency') as HTMLInputElement)?.value;
                        if (!nameVal || !agyVal) return alert('Please enter agent details');
                        setEstateAgents([...estateAgents, {
                          id: `agt-${Date.now()}`,
                          name: nameVal,
                          agency: agyVal,
                          phone: '+64 21 555 ' + Math.floor(100 + Math.random() * 900),
                          deals: 0
                        }]);
                        (document.getElementById('reg-agent-name') as HTMLInputElement).value = '';
                        (document.getElementById('reg-agent-agency') as HTMLInputElement).value = '';
                        alert('Agent Registered Successfully!');
                      }}
                      className="py-2 px-3 bg-[#de5d26] hover:bg-[#c84617] text-white rounded font-bold transition cursor-pointer"
                    >
                      Add Agent Partner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 7: LAWYER -------------------- */}
          {activeMenu === 'lawyer' && (
            <div className="space-y-6 animate-fade-in" id="view-lawyer">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Legal Solicitors & Title Search Logs</h3>
                
                <div className="overflow-x-auto text-xs">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead>
                      <tr className="bg-[#f0f0f1] font-bold">
                        <th className="p-2.5">Assigned Lawyer</th>
                        <th className="p-2.5">Buyer Client</th>
                        <th className="p-2.5">Current Legal Stage</th>
                        <th className="p-2.5">Lawyer Case Notes</th>
                        <th className="p-2.5 text-right">Escrow Checklist</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1] text-slate-600">
                      {queries.map(q => (
                        <tr key={q.id}>
                          <td className="p-2.5 font-bold text-[#2271b1]">Elena Rostova</td>
                          <td className="p-2.5 font-semibold text-slate-800">{q.buyerName}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                              {q.legalStatus || 'Contract Review'}
                            </span>
                          </td>
                          <td className="p-2.5 italic text-slate-500 text-[11px] max-w-xs truncate">{q.legalNotes || 'Pre-settlement deed validation in progress.'}</td>
                          <td className="p-2.5 text-right text-emerald-600 font-bold">Passed Inspection</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 8: SETTLEMENT -------------------- */}
          {activeMenu === 'settlement' && (
            <div className="space-y-6 animate-fade-in" id="view-settlement">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Financial Settlement & Fund Escrow Desk</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded bg-slate-50 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800">Settlement Verification Checklist</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded focus:ring-[#de5d26]" />
                        <span>Pre-Settlement physical property inspection completed</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded focus:ring-[#de5d26]" />
                        <span>Cleared Bank Lending Funds / Mortgage Drawdowns</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded focus:ring-[#de5d26]" />
                        <span>Signed Transfer of Title Deed registered</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded focus:ring-[#de5d26]" />
                        <span>Valid building insurance binders attached</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border p-4 rounded bg-white space-y-3">
                    <h4 className="text-xs font-bold text-slate-800">Direct Escrow Triggers</h4>
                    <p className="text-[11px] text-slate-400">Trigger automated fund transfers to clear solicitors accounts and move target properties to Settled status immediately.</p>
                    <button
                      onClick={() => alert('Escrow audit passed. Fund clearance generated!')}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition cursor-pointer"
                    >
                      Execute Fund Release (Escrow Clear)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 9: INSURANCE -------------------- */}
          {activeMenu === 'insurance' && (
            <div className="space-y-6 animate-fade-in" id="view-insurance">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Pre-Settlement Insurance Policy Covers</h3>
                  <span className="text-[11px] text-slate-400">Mandatory for Bank Drawdown</span>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead>
                      <tr className="bg-[#f0f0f1] font-bold">
                        <th className="p-2.5">Buyer / Applicant</th>
                        <th className="p-2.5">Target Property</th>
                        <th className="p-2.5">Provider Selected</th>
                        <th className="p-2.5">Annual Premium Quote</th>
                        <th className="p-2.5 text-right">Policy Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1] text-slate-600">
                      {insurancePolicies.map(ins => (
                        <tr key={ins.id}>
                          <td className="p-2.5 font-bold text-slate-900">{ins.buyerName}</td>
                          <td className="p-2.5 text-[#2271b1]">{ins.propertyTitle}</td>
                          <td className="p-2.5 font-semibold">{ins.provider}</td>
                          <td className="p-2.5 font-mono">NZD ${(ins.premium).toLocaleString()}</td>
                          <td className="p-2.5 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ins.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {ins.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quick Add Policy cover */}
                <div className="bg-slate-50 p-4 border rounded space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">Log Policy Binding Statement</h4>
                  <form onSubmit={handleAddInsurance} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Buyer Name"
                      value={newInsBuyer}
                      onChange={(e) => setNewInsBuyer(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Property Title"
                      value={newInsProp}
                      onChange={(e) => setNewInsProp(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <select
                      value={newInsProvider}
                      onChange={(e) => setNewInsProvider(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    >
                      <option value="AMI Premium Cover">AMI Premium Cover</option>
                      <option value="AA Building Insurance">AA Building Insurance</option>
                      <option value="State Farm Comprehensive">State Farm Comprehensive</option>
                    </select>
                    <input
                      type="number"
                      required
                      placeholder="Premium Cost"
                      value={newInsPremium}
                      onChange={(e) => setNewInsPremium(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <div className="col-span-1 sm:col-span-4 flex justify-end">
                      <button
                        type="submit"
                        className="py-1.5 px-4 bg-[#de5d26] hover:bg-[#c84617] text-white font-bold rounded transition cursor-pointer text-xs"
                      >
                        Bind Policy Contract
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 10: MOVER COORDINATION -------------------- */}
          {activeMenu === 'mover_coordination' && (
            <div className="space-y-6 animate-fade-in" id="view-movers">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Moving Truck & Removalist Schedules</h3>
                
                <div className="overflow-x-auto text-xs">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead>
                      <tr className="bg-[#f0f0f1] font-bold">
                        <th className="p-2.5">Home Buyer</th>
                        <th className="p-2.5">Truck Logistics Provider</th>
                        <th className="p-2.5">Scheduled Move Date</th>
                        <th className="p-2.5">Quoted Cost</th>
                        <th className="p-2.5 text-right">Coordination status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1] text-slate-600">
                      {movers.map(mov => (
                        <tr key={mov.id}>
                          <td className="p-2.5 font-bold text-slate-900">{mov.buyerName}</td>
                          <td className="p-2.5 font-semibold text-[#2271b1]">{mov.companyName}</td>
                          <td className="p-2.5 font-mono"><Calendar className="w-3.5 h-3.5 inline mr-1 text-slate-400" />{mov.moveDate}</td>
                          <td className="p-2.5 font-mono">NZD ${(mov.cost).toLocaleString()}</td>
                          <td className="p-2.5 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {mov.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 border rounded space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">Schedule Logistics Unit</h4>
                  <form onSubmit={handleAddMover} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Buyer Name"
                      value={newMoverBuyer}
                      onChange={(e) => setNewMoverBuyer(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Mover Company"
                      value={newMoverCompany}
                      onChange={(e) => setNewMoverCompany(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <input
                      type="date"
                      required
                      value={newMoverDate}
                      onChange={(e) => setNewMoverDate(e.target.value)}
                      className="p-2 border rounded bg-white text-xs text-slate-800"
                    />
                    <input
                      type="number"
                      placeholder="Quote Cost"
                      value={newMoverCost}
                      onChange={(e) => setNewMoverCost(e.target.value)}
                      className="p-2 border rounded bg-white text-xs text-slate-800"
                    />
                    <div className="col-span-1 sm:col-span-4 flex justify-end">
                      <button
                        type="submit"
                        className="py-1.5 px-4 bg-[#de5d26] hover:bg-[#c84617] text-white font-bold rounded transition cursor-pointer text-xs"
                      >
                        Confirm Logistic Dispatch
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 11: FURNISHER -------------------- */}
          {activeMenu === 'furnisher' && (
            <div className="space-y-6 animate-fade-in" id="view-furnisher">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Custom Furniture Styling & Staging Desks</h3>
                
                <div className="overflow-x-auto text-xs">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead>
                      <tr className="bg-[#f0f0f1] font-bold">
                        <th className="p-2.5">Buyer</th>
                        <th className="p-2.5">Aesthetic / Style Package</th>
                        <th className="p-2.5">Furniture Budget</th>
                        <th className="p-2.5">Style Items List</th>
                        <th className="p-2.5 text-right">Staging Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1] text-slate-600">
                      {furniturePlans.map(f => (
                        <tr key={f.id}>
                          <td className="p-2.5 font-bold text-slate-900">{f.buyerName}</td>
                          <td className="p-2.5 font-bold text-[#2271b1]">{f.style}</td>
                          <td className="p-2.5 font-mono">NZD ${(f.budget).toLocaleString()}</td>
                          <td className="p-2.5 max-w-xs truncate">{f.items.join(', ')}</td>
                          <td className="p-2.5 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                              {f.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 border rounded space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">Deploy Interior Staging Plan</h4>
                  <form onSubmit={handleAddFurniture} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Buyer Name"
                      value={newFurnBuyer}
                      onChange={(e) => setNewFurnBuyer(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <select
                      value={newFurnStyle}
                      onChange={(e) => setNewFurnStyle(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    >
                      <option value="Scandinavian Minimalist">Scandinavian Minimalist</option>
                      <option value="Industrial Loft Staging">Industrial Loft Staging</option>
                      <option value="Classic Mid-Century Modern">Classic Mid-Century Modern</option>
                    </select>
                    <input
                      type="number"
                      required
                      placeholder="Budget Allocated"
                      value={newFurnBudget}
                      onChange={(e) => setNewFurnBudget(e.target.value)}
                      className="p-2 border rounded bg-white text-xs"
                    />
                    <div className="col-span-1 sm:col-span-3 flex justify-end">
                      <button
                        type="submit"
                        className="py-1.5 px-4 bg-[#de5d26] hover:bg-[#c84617] text-white font-bold rounded transition cursor-pointer text-xs"
                      >
                        Deploy Stylist Contract
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 12: SETTLED -------------------- */}
          {activeMenu === 'settled' && (
            <div className="space-y-6 animate-fade-in" id="view-settled">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold border-b pb-2">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold uppercase">Fully Settled Real Estate Portfolios</span>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead>
                      <tr className="bg-[#f0f0f1] font-bold">
                        <th className="p-2.5">SettleMate Buyer ID</th>
                        <th className="p-2.5">Buyer Name</th>
                        <th className="p-2.5">Settled Valuation</th>
                        <th className="p-2.5">Location Sourced</th>
                        <th className="p-2.5 text-right">Transition Phase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1] text-slate-600">
                      {queries.filter(q => q.status === 'Completed' || q.status === 'Approved').map(q => (
                        <tr key={q.id}>
                          <td className="p-2.5 font-mono text-[11px] text-slate-400">{q.id}</td>
                          <td className="p-2.5 font-bold text-slate-900">{q.buyerName}</td>
                          <td className="p-2.5 font-mono font-bold text-emerald-600">NZD ${q.budget.toLocaleString()}</td>
                          <td className="p-2.5">{q.location}</td>
                          <td className="p-2.5 text-right">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-bold font-mono">
                              100% TRANSITIONED
                            </span>
                          </td>
                        </tr>
                      ))}
                      {/* Standard preseed if none found */}
                      {queries.filter(q => q.status === 'Completed' || q.status === 'Approved').length === 0 && (
                        <tr>
                          <td className="p-2.5 font-mono text-[11px] text-slate-400">qry-settle-091</td>
                          <td className="p-2.5 font-bold text-slate-900">David Miller (Adviser Account)</td>
                          <td className="p-2.5 font-mono font-bold text-emerald-600">NZD $950,000</td>
                          <td className="p-2.5">Auckland City</td>
                          <td className="p-2.5 text-right">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-bold font-mono">
                              100% TRANSITIONED
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 13: ANALYTICS -------------------- */}
          {activeMenu === 'analytics' && (
            <div className="space-y-6 animate-fade-in" id="view-analytics">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Total list value counter */}
                <div className="bg-white border border-[#c3c4c7] rounded p-4 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Portfolio Valuation</span>
                  <p className="text-2xl font-black text-[#1d2327] font-mono">NZD ${(totalListedValue + 1500000).toLocaleString()}</p>
                  <span className="text-[9px] text-emerald-600 font-bold">↑ Active New Zealand Market</span>
                </div>

                {/* Total active contracts */}
                <div className="bg-white border border-[#c3c4c7] rounded p-4 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Active Advisory Pipelines</span>
                  <p className="text-2xl font-black text-[#1d2327] font-mono">{activeQueries.length} Buyers</p>
                  <span className="text-[9px] text-[#de5d26] font-bold">Sourcing and Legal Exchange</span>
                </div>

                {/* Total insurance quote bind */}
                <div className="bg-white border border-[#c3c4c7] rounded p-4 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Active Insurance Binders</span>
                  <p className="text-2xl font-black text-[#1d2327] font-mono">{insurancePolicies.length} Policies</p>
                  <span className="text-[9px] text-[#2271b1] font-bold">Underwritten to Bank Specifications</span>
                </div>

              </div>

              {/* Security Audit stream from props */}
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
                  <Activity className="w-4 h-4 mr-1.5 text-purple-600" />
                  <span>Real-Time Security Audit Stream Logs</span>
                </h3>
                
                <div className="divide-y divide-[#f0f0f1] max-h-96 overflow-y-auto text-xs">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="py-2.5 flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-[#2271b1]">{log.userName}</span>
                          <span className="bg-slate-100 text-[9px] font-bold px-1 py-0.5 rounded text-slate-600">
                            {log.userRole}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="bg-[#f0f6fc] border text-[9px] font-mono font-bold px-1.5 py-0.2 rounded text-[#2271b1]">
                            {log.action}
                          </span>
                        </div>
                        <p className="text-slate-500 font-mono text-[11px] leading-relaxed">{log.details}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------- VIEW 14: NOTIFICATIONS -------------------- */}
          {activeMenu === 'notifications' && (
            <div className="space-y-6 animate-fade-in" id="view-notifications">
              <div className="bg-white border border-[#c3c4c7] rounded-lg p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">System Notifications Center</h2>
                    <p className="text-xs text-slate-500">View and clear alerts and updates sent across SettleMate.</p>
                  </div>
                  {notifications.some(n => !n.isRead) && (
                    <button
                      onClick={onClearNotifications}
                      className="px-3 py-1.5 bg-[#f0f6fc] hover:bg-[#d2e3f7] border border-[#2271b1] text-[#2271b1] text-xs font-bold rounded transition cursor-pointer"
                      id="admin-clear-notifs-btn"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#f0f0f1] max-h-[500px] overflow-y-auto text-xs" id="admin-notif-list">
                  {relevantNotifications.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                      No system notifications received yet.
                    </div>
                  ) : (
                    relevantNotifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className={`py-3 flex justify-between items-start cursor-pointer hover:bg-slate-50 px-3 rounded-lg transition ${!notif.isRead ? 'bg-orange-50/30 border-l-4 border-[#de5d26] pl-2' : ''}`}
                        id={`admin-notif-item-${notif.id}`}
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <span className="font-bold text-slate-800">{notif.title}</span>
                            <span className="bg-slate-100 text-[9px] font-bold px-1 py-0.5 rounded text-slate-600">
                              Sender: {notif.senderName} ({notif.senderRole})
                            </span>
                            {!notif.isRead && (
                              <span className="bg-[#de5d26] text-white text-[8px] font-bold uppercase px-1.5 py-0.2 rounded font-mono">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 leading-relaxed text-xs">{notif.message}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                          {new Date(notif.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Admin Workspace Footer */}
        <footer className="mt-auto px-6 py-3.5 border-t border-[#dcdcde] bg-white flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2" id="admin-workspace-footer">
          <span>© 2026 SettleMate Limited (NZ) • Coordination & Governance Management</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-slate-800 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('csa')}
              className="hover:text-[#c84617] font-semibold text-[#de5d26] underline cursor-pointer"
              title="Customer Service Agreement"
            >
              CSA
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('disclaimer')}
              className="hover:text-slate-800 underline cursor-pointer"
            >
              Disclaimer
            </button>
          </div>
        </footer>

      </main>
    </div>
  );
}
