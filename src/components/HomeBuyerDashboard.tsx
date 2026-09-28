/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  DollarSign, 
  MapPin, 
  CheckCircle2, 
  Check,
  HelpCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Gavel, 
  Compass, 
  Send, 
  PlusCircle, 
  Plus,
  X,
  Trash2,
  AlertTriangle,
  ChevronRight,
  Info,
  Home,
  Flag,
  Map,
  Folder,
  MessageCircle
} from 'lucide-react';
import { User, PropertyQuery, Milestone, QueryStatus, SharedDocument, UserRole, DocumentCategory } from '../types';
import { createStandardJourneyMilestones } from '../mockData';
import DocumentVault from './DocumentVault';

interface HomeBuyerDashboardProps {
  currentUser: User;
  queries: PropertyQuery[];
  documents: SharedDocument[];
  onCreateQuery: (queryData: { title: string; description: string; budget: number; location: string }) => void;
  onSendMessage: (queryId: string, message: string) => void;
  onUploadDocument: (doc: {
    fileName: string;
    fileCategory: DocumentCategory;
    fileSize: string;
    sharedWith: ('All Team' | UserRole)[];
    notes?: string;
  }) => void;
  onUpdateSharing: (docId: string, sharedWith: ('All Team' | UserRole)[]) => void;
  onDeleteDocument: (docId: string) => void;
  onToggleMilestone?: (queryId: string, milestoneId: string) => void;
}

export default function HomeBuyerDashboard({
  currentUser,
  queries,
  documents,
  onCreateQuery,
  onSendMessage,
  onUploadDocument,
  onUpdateSharing,
  onDeleteDocument,
  onToggleMilestone
}: HomeBuyerDashboardProps) {
  // Find the query for this buyer
  const activeQuery = queries.find(q => q.buyerId === currentUser.id);

  // Stored Journey Milestones: strictly loaded from active query persistence
  const computedMilestones = useMemo(() => {
    if (!activeQuery) return [];

    if (activeQuery.milestones && activeQuery.milestones.length >= 12) {
      return activeQuery.milestones;
    }

    // Default 12 milestones for buyer: Stage 0 completed, stages 1-11 awaiting admin approval
    return createStandardJourneyMilestones(true);
  }, [activeQuery]);

  const currentMilestone = computedMilestones.find(m => !m.completed);
  const currentStageIndex = computedMilestones.findIndex(m => !m.completed);

  const completedMilestonesCount = computedMilestones.filter(m => m.completed).length;
  const totalMilestonesCount = computedMilestones.length || 1;
  const journeyProgressPercent = computedMilestones.length > 0
    ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100)
    : 0;

  // Form states for creating query
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBudget, setNewBudget] = useState(currentUser.buyerDetails?.budget || 500000);
  const [newLoc, setNewLoc] = useState(currentUser.buyerDetails?.desiredLocation || '');
  const [chatInput, setChatInput] = useState('');

  // Tracker Sub-tab & Properties state
  const [trackerSubTab, setTrackerSubTab] = useState<'properties' | 'loan_status'>('properties');
  interface TrackedPropertyItem {
    id: string;
    address: string;
    suburb: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    status: 'Interested' | 'Viewing Scheduled' | 'Offer Submitted' | 'Under Review' | 'Purchased';
    notes?: string;
  }
  const [trackedProperties, setTrackedProperties] = useState<TrackedPropertyItem[]>([]);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [propAddress, setPropAddress] = useState('');
  const [propSuburb, setPropSuburb] = useState('');
  const [propPrice, setPropPrice] = useState<number | ''>('');
  const [propBeds, setPropBeds] = useState<number | ''>(3);
  const [propBaths, setPropBaths] = useState<number | ''>(2);
  const [propStatus, setPropStatus] = useState<TrackedPropertyItem['status']>('Interested');
  const [propNotes, setPropNotes] = useState('');

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propAddress.trim()) return;

    const newProp: TrackedPropertyItem = {
      id: `prop-${Date.now()}`,
      address: propAddress,
      suburb: propSuburb || 'Auckland',
      price: typeof propPrice === 'number' ? propPrice : 1250000,
      bedrooms: typeof propBeds === 'number' ? propBeds : 3,
      bathrooms: typeof propBaths === 'number' ? propBaths : 2,
      status: propStatus,
      notes: propNotes
    };

    setTrackedProperties(prev => [newProp, ...prev]);
    setIsAddPropertyModalOpen(false);
    
    // reset form
    setPropAddress('');
    setPropSuburb('');
    setPropPrice('');
    setPropBeds(3);
    setPropBaths(2);
    setPropStatus('Interested');
    setPropNotes('');
  };

  const handleDeleteProperty = (id: string) => {
    setTrackedProperties(prev => prev.filter(p => p.id !== id));
  };

  // Bottom navigation tab state
  const [activeTab, setActiveTab] = useState<'home' | 'tracker' | 'vault' | 'support'>('home');

  const handleNavClick = (tab: 'home' | 'tracker' | 'vault' | 'support') => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'tracker') {
      const el = document.getElementById('buyer-milestones-tracker');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'vault') {
      const el = document.getElementById('document-vault-module');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (tab === 'support') {
      const el = document.getElementById('buyer-chat-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newLoc) return;
    onCreateQuery({
      title: newTitle,
      description: newDesc,
      budget: Number(newBudget),
      location: newLoc
    });
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeQuery) return;
    onSendMessage(activeQuery.id, chatInput.trim());
    setChatInput('');
  };

  const getStatusBadgeClass = (status: QueryStatus) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Action Required':
        return 'bg-amber-50 text-amber-700 border-amber-200 border-2 animate-pulse';
      case 'Pending':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-36 space-y-6 animate-fade-in" id="buyer-dashboard-view">
      
      {/* 1. VAULT VIEW (My Papers, Shared Documents, Tasks, Budget) */}
      {activeTab === 'vault' ? (
        <div className="animate-fade-in space-y-6">
          <DocumentVault
            currentUser={currentUser}
            documents={documents}
            activeQueryId={activeQuery?.id}
            onUploadDocument={onUploadDocument}
            onUpdateSharing={onUpdateSharing}
            onDeleteDocument={onDeleteDocument}
          />
        </div>
      ) : activeTab === 'tracker' ? (
        /* 2. TRACKER VIEW (Matching exact screenshot for Properties & Loan Status) */
        <div className="animate-fade-in space-y-6" id="buyer-tracker-page">
          {/* Header with Tracker Title and Orange Circle "+" Button */}
          <div className="flex items-center justify-between px-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tracker
            </h1>
            <button
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E05326] hover:bg-[#c8441c] text-white flex items-center justify-center shadow-sm font-bold transition cursor-pointer"
              title="Add property"
              id="tracker-add-property-top-btn"
            >
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Sub-tabs: Properties | Loan Status */}
          <div className="bg-[#FAF8F5] p-1.5 rounded-2xl border border-slate-200/80 flex items-center space-x-1 shadow-2xs">
            <button
              onClick={() => setTrackerSubTab('properties')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-extrabold transition cursor-pointer text-center ${
                trackerSubTab === 'properties'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              id="tracker-subtab-properties"
            >
              Properties
            </button>
            <button
              onClick={() => setTrackerSubTab('loan_status')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-extrabold transition cursor-pointer text-center ${
                trackerSubTab === 'loan_status'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              id="tracker-subtab-loan-status"
            >
              Loan Status
            </button>
          </div>

          {/* SUBTAB CONTENT */}
          {trackerSubTab === 'properties' ? (
            /* PROPERTIES SUBTAB (Exact match to screenshot) */
            <div className="animate-fade-in" id="properties-tab-content">
              {trackedProperties.length === 0 ? (
                /* EMPTY STATE MATCHING SCREENSHOT EXACTLY */
                <div
                  onClick={() => setIsAddPropertyModalOpen(true)}
                  className="py-24 sm:py-32 flex flex-col items-center justify-center text-center cursor-pointer group rounded-3xl transition-all hover:bg-slate-50/50"
                  id="empty-properties-cta"
                >
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                    <Home className="w-16 h-16 sm:w-20 sm:h-20 text-slate-400 stroke-[1.25] group-hover:text-[#E05326] transition-colors" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    No properties yet
                  </h2>
                  <p className="text-base text-slate-500 font-medium mt-1">
                    Tap + to add the first one
                  </p>
                </div>
              ) : (
                /* LIST OF ADDED PROPERTIES */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="properties-list">
                  {trackedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:border-slate-300 transition"
                      id={`property-card-${prop.id}`}
                    >
                      <div className="flex items-start justify-between space-x-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FDF0EC] text-[#E05326] mb-1.5 border border-[#FADCD3]">
                            {prop.status}
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                            {prop.address}
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 flex items-center mt-0.5">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {prop.suburb}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteProperty(prop.id)}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                          title="Remove property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-slate-700">
                        <span className="text-base font-extrabold text-slate-900">
                          ${prop.price.toLocaleString()} NZD
                        </span>
                        <div className="flex items-center space-x-3 text-slate-500 font-medium">
                          <span>{prop.bedrooms} Beds</span>
                          <span>•</span>
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                      </div>

                      {prop.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                          "{prop.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* LOAN STATUS SUBTAB */
            <div className="animate-fade-in space-y-4" id="loan-status-tab-content">
              <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-2xs overflow-hidden divide-y divide-slate-100">
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="w-8 h-8 rounded-full bg-[#2D7048] flex items-center justify-center text-white shadow-2xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-base font-extrabold text-slate-900">Documents Submitted</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#2D7048]">Done</span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="w-8 h-8 rounded-full bg-[#2D7048] flex items-center justify-center text-white shadow-2xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-base font-extrabold text-slate-900">Credit Check</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#2D7048]">Done</span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="w-8 h-8 rounded-full bg-[#2D7048] flex items-center justify-center text-white shadow-2xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-base font-extrabold text-slate-900">Valuation Ordered</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#2D7048]">Done</span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="w-8 h-8 rounded-full bg-[#E05326] flex items-center justify-center text-white shadow-2xs">
                      <Clock className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-base font-extrabold text-slate-900">Bank Assessment</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#E05326]">In Progress</span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[2.5] opacity-0" />
                    </div>
                    <span className="text-base font-extrabold text-slate-900">Conditional Approval</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-400">Pending</span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[2.5] opacity-0" />
                    </div>
                    <span className="text-base font-extrabold text-slate-900">Final Approval</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-400">Pending</span>
                </div>
              </div>

              <p className="text-center text-xs font-semibold text-slate-400 pt-1">
                Tap a stage to update its status
              </p>
            </div>
          )}
        </div>
      ) : activeTab === 'support' ? (
        /* 3. SUPPORT / INTERCOM VIEW */
        <div className="animate-fade-in space-y-6 max-w-3xl mx-auto" id="buyer-support-page">
          <div className="flex items-center justify-between px-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Concierge & Support
            </h1>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-[#E05326]" />
                <span>SettleMate Advisor Intercom</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Instant messaging with your assigned Mortgage Adviser, Lawyer, and Real Estate Agent.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 h-72 overflow-y-auto space-y-3 text-xs" id="support-chat-container">
              <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs leading-relaxed text-slate-600 shadow-2xs">
                <span className="font-bold text-slate-800 block mb-0.5">Welcome to SettleMate Concierge</span>
                Ask questions regarding mortgage pre-approvals, LIM reports, LINZ title searches, or property viewings.
              </div>
              
              <div className="p-3 bg-[#FDF0EC] text-[#E05326] rounded-xl max-w-[85%] ml-auto text-xs font-semibold shadow-2xs">
                Hi, I uploaded my passport & bank statement. When can Elena review the title deeds?
              </div>
              <div className="p-3 bg-slate-100 text-slate-800 rounded-xl max-w-[85%] text-xs shadow-2xs space-y-1">
                <span className="font-bold block text-[10px] text-slate-500 uppercase">Marcus Vance (Real Estate Agent)</span>
                Kia ora Alex! Elena has initiated the LINZ title search. I will send 3 Remuera property viewings today!
              </div>
            </div>

            <form onSubmit={handleSendChat} className="flex space-x-2 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your question for advisors..."
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                id="support-chat-input"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5"
                id="support-chat-send-btn"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* 4. HOME VIEW (Clean, Header Hero + Journey Milestones + Board + Intercom + Gallery) */
        <div className="space-y-8 animate-fade-in" id="buyer-home-page">
          
          {/* Journey Hero Card matching exact mockup screenshot */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl bg-slate-900 text-white border border-slate-800/80">
            {/* Dark interior backdrop photo */}
            <div className="absolute inset-0 z-0 opacity-45">
              <img
                src="/src/assets/images/nz_modern_home_hero_1785489212436.jpg"
                alt="Modern Luxury Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Gradient overlay for text clarity */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90">
              
              {/* Top greeting */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-wide">Welcome back</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-0.5">
                    {currentUser.name}
                  </h1>
                </div>
              </div>

              {/* Middle section: "Your home journey" & Completion % */}
              <div className="my-5 space-y-1.5 max-w-md">
                <p className="text-slate-200 text-sm font-semibold tracking-wide">Your home journey</p>
                <div className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
                  {journeyProgressPercent}%
                </div>

                {/* Progress Bar Line */}
                <div className="w-full bg-white/25 h-1.5 sm:h-2 rounded-full overflow-hidden mt-2 backdrop-blur-xs">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${journeyProgressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-slate-300 font-medium pt-0.5">Complete</p>
              </div>

              {/* Next Up Card embedded at bottom of hero */}
              {activeQuery && (
                <div className="bg-white text-slate-900 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-center space-x-3.5 max-w-lg border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF0EC] text-[#E05326] flex items-center justify-center flex-shrink-0">
                    <Flag className="w-5 h-5 fill-[#E05326]/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Up</div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                      {currentMilestone ? currentMilestone.title : 'All Milestones Completed!'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Home Grid */}
          {!activeQuery ? (
            /* Create New Query View */
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-md p-6 sm:p-8" id="no-query-setup-screen">
              <div className="text-center max-w-md mx-auto mb-8">
                <div className="bg-orange-50 text-[#E05326] p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Initiate Your Property Inquiry</h2>
                <p className="text-slate-500 text-xs mt-1">
                  Submit your specific purchasing goals. Our network of Super Admins, Mortgage Advisers, and Lawyers will review your query instantly.
                </p>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Inquiry Title / Heading</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g., 4-Bed Family Modern Home with garden in Remuera, Auckland"
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                    id="create-query-title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Budget ($ NZD)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        required
                        value={newBudget}
                        onChange={(e) => setNewBudget(Number(e.target.value))}
                        className="block w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        id="create-query-budget"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Location / Suburb</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        required
                        value={newLoc}
                        onChange={(e) => setNewLoc(e.target.value)}
                        placeholder="E.g. Remuera, Auckland or Queenstown, NZ"
                        className="block w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                        id="create-query-location"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Description of Search</label>
                  <textarea
                    required
                    rows={4}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Explain school district requirements, parking facilities, garden specs, or key amenities..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
                    id="create-query-desc"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition cursor-pointer"
                  id="submit-query-btn"
                >
                  <span>Submit Active Inquiry</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Active Query View with Milestones */
            <div className="space-y-6" id="active-query-grid">
              
              {/* Milestones and Details */}
              <div className="space-y-6">
                
                {/* Visual Milestones Tracker - "Your Journey" */}
                <div className="space-y-3 mb-6" id="buyer-milestones-tracker">
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Your Journey</h2>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Structured 12-stage property acquisition timeline
                      </p>
                    </div>
                    {activeQuery && (
                      <span className="text-xs font-bold text-[#E05326] bg-[#FDF0EC] px-3 py-1 rounded-full border border-[#FADCD3]">
                        {completedMilestonesCount} of {totalMilestonesCount} Stages Completed ({journeyProgressPercent}%)
                      </span>
                    )}
                  </div>

                  {/* Trust & Coordinator Verification Notice */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-start space-x-3 text-xs text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-[#E05326]/10 text-[#E05326] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      i
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-slate-800">SettleMate Managed Journey: </span>
                      Your journey starts with <span className="font-bold text-slate-900">Onboarding & Profile Completed</span>. As each milestone is reviewed and verified by your Super Admin coordinator and certified advisers, the next stage will be unlocked and updated here automatically.
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-2xs overflow-hidden divide-y divide-slate-100">
                    {computedMilestones.map((milestone, index) => {
                      const isCompleted = milestone.completed;
                      const isCurrent = currentMilestone?.id === milestone.id;

                      return (
                        <div
                          key={milestone.id}
                          className={`px-4 sm:px-5 py-4 flex items-center justify-between cursor-default select-none transition-colors ${
                            isCurrent ? 'bg-orange-50/30' : isCompleted ? 'bg-white' : 'bg-slate-50/20'
                          }`}
                          id={`milestone-item-${milestone.id}`}
                        >
                          <div className="flex items-center space-x-3.5 pr-2">
                            {/* Status Check Circle */}
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <div className="w-7 h-7 rounded-full bg-[#2D7048] flex items-center justify-center text-white shadow-2xs">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                              ) : isCurrent ? (
                                <div className="w-7 h-7 rounded-full border-2 border-[#E05326] bg-[#FDF0EC] flex items-center justify-center text-[#E05326] font-extrabold text-xs shadow-xs animate-pulse">
                                  {index + 1}
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-slate-400 font-bold text-xs">
                                  {index + 1}
                                </div>
                              )}
                            </div>

                            {/* Title & Description & Verification meta */}
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm sm:text-base transition-colors ${
                                  isCompleted 
                                    ? 'line-through text-slate-400 font-medium' 
                                    : isCurrent 
                                    ? 'text-slate-900 font-bold' 
                                    : 'text-slate-700 font-medium'
                                }`}>
                                  {milestone.title}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {milestone.description}
                              </p>
                              {isCompleted && milestone.updatedBy && (
                                <span className="inline-block text-[11px] font-semibold text-[#2D7048] mt-0.5">
                                  ✓ Verified by {milestone.updatedBy}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Badge Status */}
                          <div className="flex-shrink-0 pl-2">
                            {isCompleted ? (
                              <span className="bg-emerald-50 text-[#2D7048] font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                                Completed
                              </span>
                            ) : isCurrent ? (
                              <span className="bg-[#FDF0EC] text-[#E05326] font-bold text-xs px-2.5 py-1 rounded-full border border-[#FADCD3] shadow-xs">
                                Current Stage
                              </span>
                            ) : (
                              <span className="bg-slate-100 text-slate-400 font-semibold text-xs px-2 py-0.5 rounded-full">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Required Callout if Active Status */}
                {activeQuery.status === 'Action Required' && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3" id="buyer-action-alert">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-800 uppercase">Attention Required</h4>
                      <p className="text-xs text-amber-700 leading-normal mt-0.5">
                        Your assigned Mortgage Adviser has requested additional verification documents to proceed. Please review the Vault tab to upload missing files.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Fixed Bottom Navigation Bar matching user mockup */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg pt-2 pb-2.5 px-4" id="bottom-navigation-bar">
        {/* Disclaimer text right above bottom menu */}
        <div className="max-w-xl mx-auto text-center px-3 pb-1.5 mb-1.5 border-b border-slate-100">
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">
            <span className="font-semibold text-slate-500">Disclaimer :</span> SettleMate does not provide legal, financial, mortgage or tax advice, and that customers should obtain advice from appropriately licensed professionals.
          </p>
        </div>

        <div className="max-w-md mx-auto flex justify-between items-center px-4">
          
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
              activeTab === 'home' ? 'text-[#E05326]' : 'text-slate-400 hover:text-slate-600'
            }`}
            id="bottom-nav-home"
          >
            <Home className={`w-6 h-6 ${activeTab === 'home' ? 'stroke-[2.2]' : 'stroke-2'}`} />
            <span className={`text-[11px] tracking-tight ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>
              Home
            </span>
          </button>

          {/* 2. Tracker */}
          <button
            onClick={() => handleNavClick('tracker')}
            className={`flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
              activeTab === 'tracker' ? 'text-[#E05326]' : 'text-slate-400 hover:text-slate-600'
            }`}
            id="bottom-nav-tracker"
          >
            <Map className={`w-6 h-6 ${activeTab === 'tracker' ? 'stroke-[2.2]' : 'stroke-2'}`} />
            <span className={`text-[11px] tracking-tight ${activeTab === 'tracker' ? 'font-bold' : 'font-medium'}`}>
              Tracker
            </span>
          </button>

          {/* 3. Vault */}
          <button
            onClick={() => handleNavClick('vault')}
            className={`flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
              activeTab === 'vault' ? 'text-[#E05326]' : 'text-slate-400 hover:text-slate-600'
            }`}
            id="bottom-nav-vault"
          >
            <Folder className={`w-6 h-6 ${activeTab === 'vault' ? 'stroke-[2.2]' : 'stroke-2'}`} />
            <span className={`text-[11px] tracking-tight ${activeTab === 'vault' ? 'font-bold' : 'font-medium'}`}>
              Vault
            </span>
          </button>

          {/* 4. Support */}
          <button
            onClick={() => handleNavClick('support')}
            className={`flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
              activeTab === 'support' ? 'text-[#E05326]' : 'text-slate-400 hover:text-slate-600'
            }`}
            id="bottom-nav-support"
          >
            <MessageCircle className={`w-6 h-6 ${activeTab === 'support' ? 'stroke-[2.2]' : 'stroke-2'}`} />
            <span className={`text-[11px] tracking-tight ${activeTab === 'support' ? 'font-bold' : 'font-medium'}`}>
              Support
            </span>
          </button>

        </div>
      </div>

      {/* Add Property Modal */}
      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="add-property-modal">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center">
                <Home className="w-5 h-5 mr-2 text-[#E05326]" />
                Track New Property
              </h3>
              <button
                onClick={() => setIsAddPropertyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Property Address *
                </label>
                <input
                  type="text"
                  required
                  value={propAddress}
                  onChange={(e) => setPropAddress(e.target.value)}
                  placeholder="E.g. 14 Victoria Avenue"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  id="prop-address-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Suburb / City
                  </label>
                  <input
                    type="text"
                    value={propSuburb}
                    onChange={(e) => setPropSuburb(e.target.value)}
                    placeholder="Remuera, Auckland"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                    id="prop-suburb-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Price ($ NZD)
                  </label>
                  <input
                    type="number"
                    value={propPrice}
                    onChange={(e) => setPropPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="1450000"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                    id="prop-price-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    value={propBeds}
                    onChange={(e) => setPropBeds(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Baths
                  </label>
                  <input
                    type="number"
                    value={propBaths}
                    onChange={(e) => setPropBaths(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={propStatus}
                    onChange={(e) => setPropStatus(e.target.value as TrackedPropertyItem['status'])}
                    className="w-full px-2 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 bg-white"
                  >
                    <option value="Interested">Interested</option>
                    <option value="Viewing Scheduled">Viewing</option>
                    <option value="Offer Submitted">Offer Made</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Purchased">Purchased</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={propNotes}
                  onChange={(e) => setPropNotes(e.target.value)}
                  placeholder="E.g. Great school zone, open home Saturday at 2pm"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPropertyModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#E05326] hover:bg-[#c8441c] text-white rounded-xl font-bold text-sm transition shadow-sm cursor-pointer"
                  id="save-property-submit-btn"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
