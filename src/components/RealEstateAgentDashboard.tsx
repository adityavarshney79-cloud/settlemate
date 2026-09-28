/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  DollarSign, 
  MapPin, 
  CheckCircle2, 
  BellRing,
  CheckSquare
} from 'lucide-react';
import { User, PropertyQuery, SharedDocument, UserRole, DocumentCategory } from '../types';
import DocumentVault from './DocumentVault';

interface RealEstateAgentDashboardProps {
  currentUser: User;
  queries: PropertyQuery[];
  documents: SharedDocument[];
  onUpdateConciergeStatus: (
    queryId: string, 
    conciergeStatus: 'Searching Properties' | 'Viewings Scheduled' | 'Offer Negotiations' | 'Settled',
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

export default function RealEstateAgentDashboard({
  currentUser,
  queries,
  documents,
  onUpdateConciergeStatus,
  onSendNotification,
  onUploadDocument,
  onUpdateSharing,
  onUpdateStatus
}: RealEstateAgentDashboardProps) {
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(queries[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Query Form values
  const activeQuery = queries.find(q => q.id === selectedQueryId);
  const [notes, setNotes] = useState(activeQuery?.conciergeNotes || '');
  const [status, setStatus] = useState<'Searching Properties' | 'Viewings Scheduled' | 'Offer Negotiations' | 'Settled'>(
    activeQuery?.conciergeStatus || 'Searching Properties'
  );
  // Find if concierge milestone is completed
  const conciergeMilestone = activeQuery?.milestones.find(m => m.id === 'm-4' || m.id === 'm-23' || m.title.toLowerCase().includes('agent') || m.id === 'm-3' || m.id === 'm-22');
  const [isMilestoneCompleted, setIsMilestoneCompleted] = useState(conciergeMilestone?.completed || false);

  // Sync state if selected query changes
  React.useEffect(() => {
    if (activeQuery) {
      setNotes(activeQuery.conciergeNotes || '');
      setStatus(activeQuery.conciergeStatus || 'Searching Properties');
      const cm = activeQuery.milestones.find(m => m.id === 'm-4' || m.id === 'm-23' || m.title.toLowerCase().includes('agent') || m.id === 'm-3' || m.id === 'm-22');
      setIsMilestoneCompleted(cm?.completed || false);
    }
  }, [selectedQueryId, queries]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQueryId) return;
    onUpdateConciergeStatus(selectedQueryId, status, notes, isMilestoneCompleted);
    
    // Trigger notification to the buyer
    onSendNotification(
      activeQuery!.buyerId,
      `Agent Search Update: ${status}`,
      `Real Estate Agent Marcus Vance posted matching details: "${status}". Notes: ${notes.slice(0, 80)}...`
    );
  };

  const filteredQueries = queries.filter(q => 
    q.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in" id="concierge-dashboard-view">
      
      {/* Header banner */}
      <div className="bg-gradient-to-r from-amber-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-amber-800 flex justify-between items-center">
        <div>
          <span className="text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">Adviser Console Tier</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Real Estate Agent Sourcing & Matching</h1>
          <p className="text-slate-300 text-sm mt-1">
            Source matching properties, coordinate open houses, review localized neighborhood details, and arrange buyer physical property viewings.
          </p>
        </div>
        <div className="hidden sm:block p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
          <Compass className="w-8 h-8 text-amber-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Queries List (5 Columns) */}
        <div className="lg:col-span-5 space-y-4" id="concierge-queries-pane">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Premium Buyer Inquiries ({filteredQueries.length})
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
                className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
                id="search-queries-concierge"
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
                  const cStatus = q.conciergeStatus || 'Searching Properties';
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQueryId(q.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex justify-between items-start ${
                        isSelected 
                        ? 'border-amber-500 bg-amber-50/20 shadow-xs' 
                        : 'border-slate-100 hover:bg-slate-50'
                      }`}
                      id={`concierge-query-item-${q.id}`}
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
                          {cStatus}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Concierge Assessment Actions (7 Columns) */}
        <div className="lg:col-span-7" id="concierge-actions-pane">
          {activeQuery ? (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
              
              {/* Query Meta */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Under Real Estate Sourcing
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
                    Sourcing Status Pipeline Action
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      'Searching Properties', 
                      'Viewings Scheduled', 
                      'Offer Negotiations', 
                      'Settled'
                    ] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setStatus(opt)}
                        className={`py-2 px-3 text-[11px] font-semibold border rounded-lg text-center transition cursor-pointer ${
                          status === opt 
                          ? 'border-amber-600 bg-amber-50 text-amber-700 font-bold' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        id={`status-concierge-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Real Estate Agent Notes & Property Matches
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter details about shortlisted properties, scheduled times, school ratings, local neighborhood security, or offer negotiations..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
                    id="concierge-notes-text"
                  />
                </div>

                {/* Milestone Toggle */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-800">Complete Property Matching Milestone</span>
                    <span className="block text-[11px] text-slate-500">
                      Ticking this will mark "Property Matching & Viewings" as completed on the buyer's public journey tracker.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMilestoneCompleted(!isMilestoneCompleted)}
                    className="p-1 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
                    id="concierge-milestone-check-btn"
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
                    className="flex items-center space-x-1.5 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    id="concierge-save-btn"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Apply Sourcing Matches & Notify Buyer</span>
                  </button>
                </div>
              </form>

              {/* Direct Intercom Notification Tool */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <BellRing className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-800">Agent Tour Alerts</h4>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Send high-priority viewing schedules or match catalogs directly to the buyer's mobile/desktop screen.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSendNotification(
                        activeQuery.buyerId,
                        'Private Tour Confirmed',
                        'Marcus Vance has scheduled 3 house visits for this Saturday. View schedules in your Dashboard.'
                      );
                    }}
                    className="py-1.5 px-3 bg-slate-900 text-white text-[10px] font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    id="trigger-tour-alert"
                  >
                    Prompt Private Tour Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSendNotification(
                        activeQuery.buyerId,
                        'Off-Market Deal Sourced',
                        'We detected an off-market architectural home in Remuera, Auckland fitting your exact specifications. Contact Marcus immediately.'
                      );
                    }}
                    className="py-1.5 px-3 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold rounded-lg hover:bg-emerald-100/50 transition cursor-pointer"
                    id="trigger-offmarket-alert"
                  >
                    Prompt Off-Market Deal Alert
                  </button>
                </div>
              </div>

              {/* NZ Real Estate Showcase Card with Photography */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">NZ Agent Sourced Property</h4>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Remuera, Auckland</span>
                </div>
                <div className="h-32 rounded-lg overflow-hidden relative border border-slate-200">
                  <img
                    src="/src/assets/images/nz_modern_home_hero_1785489212436.jpg"
                    alt="Remuera Architectural Residence"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-2.5">
                    <p className="text-xs font-bold text-white">Remuera Native Bush Executive Home ($1,650,000 NZD)</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-12 text-center text-slate-400 text-xs">
              Select a Home Buyer query from the pipeline to perform property match sourcing.
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
