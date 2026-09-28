/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gavel, 
  Search, 
  FileText, 
  DollarSign, 
  MapPin, 
  CheckCircle2, 
  BellRing,
  CheckSquare,
  ShieldAlert
} from 'lucide-react';
import { User, PropertyQuery, Milestone, SharedDocument, UserRole, DocumentCategory } from '../types';
import DocumentVault from './DocumentVault';

interface PropertyLawyerDashboardProps {
  currentUser: User;
  queries: PropertyQuery[];
  documents: SharedDocument[];
  onUpdateLegalStatus: (
    queryId: string, 
    legalStatus: 'Title Deed Search' | 'Contract Review' | 'Exchange Pending' | 'Completed',
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

export default function PropertyLawyerDashboard({
  currentUser,
  queries,
  documents,
  onUpdateLegalStatus,
  onSendNotification,
  onUploadDocument,
  onUpdateSharing,
  onUpdateStatus
}: PropertyLawyerDashboardProps) {
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(queries[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Query Form values
  const activeQuery = queries.find(q => q.id === selectedQueryId);
  const [notes, setNotes] = useState(activeQuery?.legalNotes || '');
  const [status, setStatus] = useState<'Title Deed Search' | 'Contract Review' | 'Exchange Pending' | 'Completed'>(
    activeQuery?.legalStatus || 'Title Deed Search'
  );
  // Find if legal milestone is completed
  const legalMilestone = activeQuery?.milestones.find(m => m.id === 'm-6' || m.id === 'm-25' || m.title.toLowerCase().includes('lawyer') || m.title.toLowerCase().includes('legal') || m.id === 'm-4' || m.id === 'm-23');
  const [isMilestoneCompleted, setIsMilestoneCompleted] = useState(legalMilestone?.completed || false);

  // Sync state if selected query changes
  React.useEffect(() => {
    if (activeQuery) {
      setNotes(activeQuery.legalNotes || '');
      setStatus(activeQuery.legalStatus || 'Title Deed Search');
      const lm = activeQuery.milestones.find(m => m.id === 'm-6' || m.id === 'm-25' || m.title.toLowerCase().includes('lawyer') || m.title.toLowerCase().includes('legal') || m.id === 'm-4' || m.id === 'm-23');
      setIsMilestoneCompleted(lm?.completed || false);
    }
  }, [selectedQueryId, queries]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQueryId) return;
    onUpdateLegalStatus(selectedQueryId, status, notes, isMilestoneCompleted);
    
    // Trigger notification to the buyer
    onSendNotification(
      activeQuery!.buyerId,
      `Conveyancing Update: ${status}`,
      `Your Property Lawyer Elena Rostova updated your legal review status to: ${status}. Notes: ${notes.slice(0, 80)}...`
    );
  };

  const filteredQueries = queries.filter(q => 
    q.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in" id="lawyer-dashboard-view">
      
      {/* Header banner */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-purple-800 flex justify-between items-center">
        <div>
          <span className="text-purple-400 font-mono text-xs uppercase tracking-wider font-semibold">Adviser Console Tier</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Conveyancing & Legal Console</h1>
          <p className="text-slate-300 text-sm mt-1">
            Perform background searches, inspect title deeds, audit property sale contracts, and manage legal escrow transitions safely.
          </p>
        </div>
        <div className="hidden sm:block p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Gavel className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Queries List (5 Columns) */}
        <div className="lg:col-span-5 space-y-4" id="lawyer-queries-pane">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Buyer Conveyancing Pipeline ({filteredQueries.length})
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
                className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
                id="search-queries-lawyer"
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
                  const legStatus = q.legalStatus || 'Contract Review';
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQueryId(q.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex justify-between items-start ${
                        isSelected 
                        ? 'border-purple-500 bg-purple-50/20 shadow-xs' 
                        : 'border-slate-100 hover:bg-slate-50'
                      }`}
                      id={`lawyer-query-item-${q.id}`}
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
                          {legStatus}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Legal Assessment Actions (7 Columns) */}
        <div className="lg:col-span-7" id="lawyer-actions-pane">
          {activeQuery ? (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
              
              {/* Query Meta */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[9px] uppercase font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  Under Conveyancing Audit
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
                    Conveyancing Status Pipeline Action
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      'Title Deed Search', 
                      'Contract Review', 
                      'Exchange Pending', 
                      'Completed'
                    ] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setStatus(opt)}
                        className={`py-2 px-3 text-[11px] font-semibold border rounded-lg text-center transition cursor-pointer ${
                          status === opt 
                          ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        id={`status-lawyer-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Lawyer Contract Audit & Title Search Comments
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter details about local authority land registry checks, title restrictions, seller disclosures, contract amendments, or deposit escrows..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
                    id="lawyer-notes-text"
                  />
                </div>

                {/* Milestone Toggle */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-800">Complete Conveyancing & Contract Milestone</span>
                    <span className="block text-[11px] text-slate-500">
                      Ticking this will mark "Legal Conveyancing & Contract" as completed on the buyer's public journey tracker.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMilestoneCompleted(!isMilestoneCompleted)}
                    className="p-1 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
                    id="lawyer-milestone-check-btn"
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
                    className="flex items-center space-x-1.5 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    id="lawyer-save-btn"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Apply Legal Findings & Notify Buyer</span>
                  </button>
                </div>
              </form>

              {/* Direct Intercom Notification Tool */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <BellRing className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-800">Legal Audit Prompts / Alerts</h4>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Send critical compliance notifications or schedule final contract review appointments with the buyer.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSendNotification(
                        activeQuery.buyerId,
                        'Contract Review Complete',
                        'Elena Rostova has completed reviewing the draft sales agreement. Please schedule a call to review amendment clauses.'
                      );
                    }}
                    className="py-1.5 px-3 bg-slate-900 text-white text-[10px] font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    id="trigger-contract-alert"
                  >
                    Prompt Contract Complete Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSendNotification(
                        activeQuery.buyerId,
                        'Land Registry Checks Completed',
                        'Good news! No zoning or registry blockages detected in local county searches. Safe to proceed.'
                      );
                    }}
                    className="py-1.5 px-3 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold rounded-lg hover:bg-emerald-100/50 transition cursor-pointer"
                    id="trigger-land-check"
                  >
                    Prompt Safe Registry Alert
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-12 text-center text-slate-400 text-xs">
              Select a Home Buyer query from the pipeline to perform conveyancing audits.
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
