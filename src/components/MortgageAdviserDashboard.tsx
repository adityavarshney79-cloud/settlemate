/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Users, 
  FileText, 
  DollarSign, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  BellRing,
  CheckSquare,
  Square,
  MessageSquare
} from 'lucide-react';
import { User, PropertyQuery, Milestone, QueryStatus, SharedDocument, UserRole, DocumentCategory } from '../types';
import DocumentVault from './DocumentVault';

interface MortgageAdviserDashboardProps {
  currentUser: User;
  queries: PropertyQuery[];
  documents: SharedDocument[];
  onUpdateMortgageStatus: (
    queryId: string, 
    mortgageStatus: 'Awaiting Assessment' | 'Documents Requested' | 'Offer Issued' | 'Rejected',
    notes: string,
    completeMilestone: boolean
  ) => void;
  onSendNotification: (recipientId: string, title: string, message: string) => void;
  onUploadDocument: (doc: {
    fileName: string;
    fileCategory: DocumentCategory;
    fileSize: string;
    sharedWith: ('All Team' | UserRole)[];
    notes?: string;
  }) => void;
  onUpdateSharing: (docId: string, sharedWith: ('All Team' | UserRole)[]) => void;
  onUpdateStatus: (docId: string, status: 'Shared' | 'Under Review' | 'Verified' | 'Requires Update', notes?: string) => void;
}

export default function MortgageAdviserDashboard({
  currentUser,
  queries,
  documents,
  onUpdateMortgageStatus,
  onSendNotification,
  onUploadDocument,
  onUpdateSharing,
  onUpdateStatus
}: MortgageAdviserDashboardProps) {
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(queries[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Query Form values
  const activeQuery = queries.find(q => q.id === selectedQueryId);
  const [notes, setNotes] = useState(activeQuery?.mortgageNotes || '');
  const [status, setStatus] = useState<'Awaiting Assessment' | 'Documents Requested' | 'Offer Issued' | 'Rejected'>(
    activeQuery?.mortgageStatus || 'Awaiting Assessment'
  );
  // Find if mortgage pre-approval milestone is completed
  const mortgageMilestone = activeQuery?.milestones.find(m => m.id === 'm-3' || m.id === 'm-22' || m.title.toLowerCase().includes('pre-approval') || m.id === 'm-2' || m.id === 'm-21');
  const [isMilestoneCompleted, setIsMilestoneCompleted] = useState(mortgageMilestone?.completed || false);

  // Sync state if selected query changes
  React.useEffect(() => {
    if (activeQuery) {
      setNotes(activeQuery.mortgageNotes || '');
      setStatus(activeQuery.mortgageStatus || 'Awaiting Assessment');
      const mm = activeQuery.milestones.find(m => m.id === 'm-3' || m.id === 'm-22' || m.title.toLowerCase().includes('pre-approval') || m.id === 'm-2' || m.id === 'm-21');
      setIsMilestoneCompleted(mm?.completed || false);
    }
  }, [selectedQueryId, queries]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQueryId) return;
    onUpdateMortgageStatus(selectedQueryId, status, notes, isMilestoneCompleted);
    
    // Trigger automatic notification to the buyer when status changes
    onSendNotification(
      activeQuery!.buyerId,
      `Mortgage Update: ${status}`,
      `Your mortgage adviser David Miller updated your application status to: ${status}. Notes: ${notes.slice(0, 80)}...`
    );
  };

  const filteredQueries = queries.filter(q => 
    q.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in" id="mortgage-dashboard-view">
      
      {/* Header banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-blue-800 flex justify-between items-center">
        <div>
          <span className="text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">Adviser Console Tier</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Mortgage Advisory Console</h1>
          <p className="text-slate-300 text-sm mt-1">
            Assess buyer financial queries, verify tax document submissions, configure pre-approval letters, and update the transaction pipeline.
          </p>
        </div>
        <div className="hidden sm:block p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Briefcase className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Queries List (5 Columns) */}
        <div className="lg:col-span-5 space-y-4" id="mortgage-queries-pane">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Home Buyer Pipeline ({filteredQueries.length})
            </h3>
            <div className="relative mb-3">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search queries by buyer or title..."
                className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                id="search-queries"
              />
            </div>

            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {filteredQueries.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No property queries matched search.
                </div>
              ) : (
                filteredQueries.map((q) => {
                  const isSelected = q.id === selectedQueryId;
                  const mqStatus = q.mortgageStatus || 'Awaiting Assessment';
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQueryId(q.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex justify-between items-start ${
                        isSelected 
                        ? 'border-blue-500 bg-blue-50/20 shadow-xs' 
                        : 'border-slate-100 hover:bg-slate-50'
                      }`}
                      id={`adviser-query-item-${q.id}`}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">{q.buyerName}</span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{q.title}</h4>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-0.5 text-slate-400" />
                            {q.budget.toLocaleString()}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-0.5 text-slate-400" />
                            {q.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase bg-slate-100 text-slate-700">
                          {mqStatus}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Adviser Assessment Actions (7 Columns) */}
        <div className="lg:col-span-7" id="mortgage-actions-pane">
          {activeQuery ? (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
              
              {/* Query Meta */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[9px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Under Assessment
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-1">{activeQuery.title}</h3>
                <p className="text-xs text-slate-500 leading-normal mt-1">Submitted by: <strong className="text-slate-700">{activeQuery.buyerName}</strong></p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100/50 mt-3 leading-relaxed">
                  <strong>Buyer Search Description:</strong> "{activeQuery.description}"
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Mortgage Status Pipeline Action
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      'Awaiting Assessment', 
                      'Documents Requested', 
                      'Offer Issued', 
                      'Rejected'
                    ] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setStatus(opt)}
                        className={`py-2 px-3 text-[11px] font-semibold border rounded-lg text-center transition cursor-pointer ${
                          status === opt 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        id={`status-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Adviser Assessment & Requirements Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter details about tax filings, income requirements, rate lock approvals, or issues regarding credit ratings..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    id="adviser-notes-text"
                  />
                </div>

                {/* Milestone Toggle */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-800">Complete Pre-Approval Milestone</span>
                    <span className="block text-[11px] text-slate-500">
                      Ticking this will mark "Mortgage Pre-Approval" as completed on the buyer's public journey tracker.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMilestoneCompleted(!isMilestoneCompleted)}
                    className="p-1 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
                    id="milestone-check-btn"
                  >
                    {isMilestoneCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <div className="w-6 h-6 rounded-md border-2 border-slate-300 bg-white" />
                    )}
                  </button>
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    id="adviser-save-btn"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Apply Decisions & Notify Buyer</span>
                  </button>
                </div>
              </form>

              {/* Direct Intercom Notification Tool */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <BellRing className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-800">Workflow Prompt / Custom Real-Time Alert</h4>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Send a custom real-time pop-up notification directly to this buyer. Perfect for requesting fast documents or scheduling instant video alignments.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSendNotification(
                        activeQuery.buyerId,
                        'Urgent Document Check Required',
                        'Please verify your bank deposits or down payment statements inside your Profile settings as soon as possible.'
                      );
                    }}
                    className="py-1.5 px-3 bg-slate-900 text-white text-[10px] font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    id="trigger-urgent-alert"
                  >
                    Prompt Bank Statements Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSendNotification(
                        activeQuery.buyerId,
                        'Pre-Approval Approved',
                        'Congratulations! Your mortgage pre-approval letter is now fully signed. You can proceed with property offers!'
                      );
                    }}
                    className="py-1.5 px-3 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold rounded-lg hover:bg-emerald-100/50 transition cursor-pointer"
                    id="trigger-approval-alert"
                  >
                    Prompt congratulatory Approval Alert
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-12 text-center text-slate-400 text-xs">
              Select a Home Buyer query from the pipeline to perform mortgage assessments.
            </div>
          )}
        </div>

      </div>

      {/* Shared Client Papers Vault */}
      <DocumentVault
        currentUser={currentUser}
        documents={documents}
        activeQueryId={selectedQueryId || undefined}
        onUploadDocument={onUploadDocument}
        onUpdateSharing={onUpdateSharing}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
}
