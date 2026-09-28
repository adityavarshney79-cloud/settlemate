import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Share2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Eye, 
  Download, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  X,
  FileCheck,
  Edit3,
  Filter,
  Users,
  Banknote,
  Zap,
  Search,
  Receipt,
  DollarSign,
  Calendar,
  Check,
  FileUp,
  Paperclip
} from 'lucide-react';
import { User, UserRole, SharedDocument, DocumentCategory } from '../types';

interface DocumentVaultProps {
  currentUser: User;
  documents: SharedDocument[];
  activeQueryId?: string;
  onUploadDocument: (doc: {
    fileName: string;
    fileCategory: DocumentCategory;
    fileSize: string;
    sharedWith: ('All Team' | UserRole)[];
    notes?: string;
    downloadUrl?: string;
  }) => void;
  onUpdateSharing: (docId: string, sharedWith: ('All Team' | UserRole)[]) => void;
  onUpdateStatus?: (docId: string, status: 'Shared' | 'Under Review' | 'Verified' | 'Requires Update', notes?: string) => void;
  onDeleteDocument?: (docId: string) => void;
}

export interface BudgetItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface RequirementTask {
  id: string;
  title: string;
  status: 'Done' | 'In Progress' | 'Pending';
}

const CATEGORIES: DocumentCategory[] = [
  'Mortgage',
  'Legal',
  'Insurance',
  'Utilities',
  'Inspection',
  'Receipts',
  'Bank Statement',
  'Tax Return / W-2',
  'Proof of ID / Passport',
  'Property Valuation',
  'Purchase Contract',
  'Other Legal Paper'
];

export default function DocumentVault({
  currentUser,
  documents,
  activeQueryId,
  onUploadDocument,
  onUpdateSharing,
  onUpdateStatus,
  onDeleteDocument
}: DocumentVaultProps) {
  const isBuyer = currentUser.role === 'Home Buyer';

  // Vault Tab state: 'documents' | 'tasks' | 'budget'
  const [activeVaultTab, setActiveVaultTab] = useState<'documents' | 'tasks' | 'budget'>('documents');

  // Tasks sub-tab: 'properties' | 'loan_status'
  const [tasksSubTab, setTasksSubTab] = useState<'properties' | 'loan_status'>('loan_status');

  // Interactive Requirement Tasks
  const [requirementTasks, setRequirementTasks] = useState<RequirementTask[]>([
    { id: '1', title: 'Documents Submitted', status: 'Done' },
    { id: '2', title: 'Credit Check', status: 'Done' },
    { id: '3', title: 'Valuation Ordered', status: 'Done' },
    { id: '4', title: 'Bank Assessment', status: 'In Progress' },
    { id: '5', title: 'Conditional Approval', status: 'Pending' },
    { id: '6', title: 'Final Approval', status: 'Pending' }
  ]);

  // Budget Items
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 'b-1', title: 'LIM Report Fee', category: 'Legal', amount: 380, date: '2026-08-10' },
    { id: 'b-2', title: 'Building Inspection', category: 'Inspection', amount: 650, date: '2026-08-12' },
  ]);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [budgetTitle, setBudgetTitle] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('Legal');
  const [budgetAmount, setBudgetAmount] = useState<number | ''>('');
  const [budgetDate, setBudgetDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal / Form state for documents
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState<DocumentCategory>('Mortgage');
  const [fileSizeStr, setFileSizeStr] = useState('1.8 MB');
  const [notes, setNotes] = useState('');
  const [selectedFileObj, setSelectedFileObj] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sharing choices
  const [shareAll, setShareAll] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([
    'Mortgage Adviser',
    'Property Lawyer',
    'Real Estate Agent',
    'Super Admin'
  ]);

  // Editing sharing permissions state
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editSharingRoles, setEditSharingRoles] = useState<('All Team' | UserRole)[]>([]);

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [previewDoc, setPreviewDoc] = useState<SharedDocument | null>(null);

  // Review status modal state for professionals
  const [reviewDoc, setReviewDoc] = useState<SharedDocument | null>(null);
  const [reviewStatus, setReviewStatus] = useState<'Shared' | 'Under Review' | 'Verified' | 'Requires Update'>('Verified');
  const [reviewNotes, setReviewNotes] = useState('');

  // Auto-detect category from filename
  const autoDetectCategory = (name: string): DocumentCategory => {
    const lower = name.toLowerCase();
    if (lower.includes('bank') || lower.includes('statement')) return 'Bank Statement';
    if (lower.includes('tax') || lower.includes('w-2') || lower.includes('ird')) return 'Tax Return / W-2';
    if (lower.includes('passport') || lower.includes('id') || lower.includes('license') || lower.includes('licence')) return 'Proof of ID / Passport';
    if (lower.includes('valuation') || lower.includes('rv')) return 'Property Valuation';
    if (lower.includes('contract') || lower.includes('agreement') || lower.includes('deed')) return 'Purchase Contract';
    if (lower.includes('insurance') || lower.includes('policy')) return 'Insurance';
    if (lower.includes('util') || lower.includes('power') || lower.includes('broadband')) return 'Utilities';
    if (lower.includes('inspect') || lower.includes('builder') || lower.includes('lim')) return 'Inspection';
    if (lower.includes('receipt') || lower.includes('invoice')) return 'Receipts';
    if (lower.includes('lawyer') || lower.includes('legal') || lower.includes('conveyanc')) return 'Legal';
    return 'Mortgage';
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Process chosen file
  const processSelectedFile = (file: File) => {
    try {
      setSelectedFileObj(file);
      setFileName(file.name);
      setFileSizeStr(formatFileSize(file.size));
      setFileCategory(autoDetectCategory(file.name));

      // For smaller files, keep base64; for larger files, use fast lightweight ObjectURL
      if (file.size < 1.5 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setFileDataUrl(reader.result);
          }
        };
        reader.onerror = () => {
          try {
            setFileDataUrl(URL.createObjectURL(file));
          } catch (e) {
            setFileDataUrl(undefined);
          }
        };
        reader.readAsDataURL(file);
      } else {
        try {
          const blobUrl = URL.createObjectURL(file);
          setFileDataUrl(blobUrl);
        } catch (e) {
          setFileDataUrl(undefined);
        }
      }
    } catch (err) {
      console.warn('Error processing selected file:', err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDownloadDoc = (doc: SharedDocument) => {
    if (doc.downloadUrl) {
      const a = document.createElement('a');
      a.href = doc.downloadUrl;
      a.download = doc.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([`SettleMate Document Vault File\nFile Name: ${doc.fileName}\nCategory: ${doc.fileCategory}\nStatus: ${doc.status}\nUploaded By: ${doc.buyerName}`], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName.endsWith('.txt') ? doc.fileName : `${doc.fileName}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Count files per category for 6 folder cards
  const getDocCountForCat = (cat: string) => {
    return documents.filter(d => {
      if (cat === 'Mortgage') return d.fileCategory === 'Mortgage' || d.fileCategory === 'Bank Statement' || d.fileCategory === 'Tax Return / W-2';
      if (cat === 'Legal') return d.fileCategory === 'Legal' || d.fileCategory === 'Purchase Contract' || d.fileCategory === 'Other Legal Paper';
      if (cat === 'Inspection') return d.fileCategory === 'Inspection' || d.fileCategory === 'Property Valuation';
      return d.fileCategory === cat;
    }).length;
  };

  // Filter documents according to user role and active filter
  const visibleDocuments = documents.filter(doc => {
    if (isBuyer) {
      return doc.buyerId === currentUser.id || !doc.buyerId;
    }
    if (currentUser.role === 'Super Admin') return true;
    return doc.sharedWith.includes('All Team') || doc.sharedWith.includes(currentUser.role);
  }).filter(doc => {
    if (categoryFilter === 'ALL') return true;
    if (categoryFilter === 'Mortgage') return doc.fileCategory === 'Mortgage' || doc.fileCategory === 'Bank Statement' || doc.fileCategory === 'Tax Return / W-2';
    if (categoryFilter === 'Legal') return doc.fileCategory === 'Legal' || doc.fileCategory === 'Purchase Contract' || doc.fileCategory === 'Other Legal Paper';
    if (categoryFilter === 'Inspection') return doc.fileCategory === 'Inspection' || doc.fileCategory === 'Property Valuation';
    return doc.fileCategory === categoryFilter;
  });

  const handleToggleRole = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      const next = selectedRoles.filter(r => r !== role);
      setSelectedRoles(next);
      if (next.length < 4) setShareAll(false);
    } else {
      const next = [...selectedRoles, role];
      setSelectedRoles(next);
      if (next.length === 4) setShareAll(true);
    }
  };

  const handleToggleShareAll = (checked: boolean) => {
    setShareAll(checked);
    if (checked) {
      setSelectedRoles(['Mortgage Adviser', 'Property Lawyer', 'Real Estate Agent', 'Super Admin']);
    } else {
      setSelectedRoles([]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = fileName.trim() || 'Untitled_Document.pdf';

    const finalSharing: ('All Team' | UserRole)[] = shareAll 
      ? ['All Team'] 
      : selectedRoles.length > 0 ? selectedRoles : ['All Team'];

    onUploadDocument({
      fileName: finalTitle,
      fileCategory,
      fileSize: fileSizeStr,
      sharedWith: finalSharing,
      notes: notes.trim(),
      downloadUrl: fileDataUrl
    });

    // Instant toast feedback
    setUploadSuccessToast(`"${finalTitle}" uploaded successfully to Vault!`);
    setTimeout(() => setUploadSuccessToast(null), 4000);

    // Reset form
    setFileName('');
    setNotes('');
    setSelectedFileObj(null);
    setFileDataUrl(undefined);
    setShowUploadModal(false);
  };

  const handleAddBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetTitle.trim() || !budgetAmount) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      title: budgetTitle.trim(),
      category: budgetCategory,
      amount: Number(budgetAmount),
      date: budgetDate
    };

    setBudgetItems(prev => [newItem, ...prev]);
    setBudgetTitle('');
    setBudgetAmount('');
    setShowAddBudgetModal(false);
  };

  const handleDeleteBudgetItem = (id: string) => {
    setBudgetItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setRequirementTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const nextStatus = task.status === 'Done' ? 'In Progress' : task.status === 'In Progress' ? 'Pending' : 'Done';
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const handleStartEditSharing = (doc: SharedDocument) => {
    setEditingDocId(doc.id);
    setEditSharingRoles([...doc.sharedWith]);
  };

  const handleSaveSharing = (docId: string) => {
    onUpdateSharing(docId, editSharingRoles.length > 0 ? editSharingRoles : ['All Team']);
    setEditingDocId(null);
  };

  const handleSaveReviewStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewDoc && onUpdateStatus) {
      onUpdateStatus(reviewDoc.id, reviewStatus, reviewNotes);
      setReviewDoc(null);
    }
  };

  const totalBudgetSpend = budgetItems.reduce((acc, curr) => acc + curr.amount, 0);

  const getStatusStyle = (status: SharedDocument['status']) => {
    switch (status) {
      case 'Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Requires Update':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6" id="document-vault-module">
      
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between shadow-md animate-fade-in" id="vault-success-toast">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold">{uploadSuccessToast}</span>
          </div>
          <button onClick={() => setUploadSuccessToast(null)} className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Document Vault
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            One Journey. One Coordinator. Encrypted property repository with AES-256 security.
          </p>
        </div>
        
        {/* Upload Action Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#de5d26] hover:bg-[#c84617] text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-md shadow-orange-600/20 cursor-pointer"
          id="vault-header-upload-btn"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* 3 Top Segmented Tabs: Documents | Tasks | Budget */}
      <div className="bg-[#FAF8F5] p-1.5 rounded-2xl border border-slate-200/80 flex items-center space-x-1 shadow-2xs">
        <button
          onClick={() => setActiveVaultTab('documents')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
            activeVaultTab === 'documents'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          id="vault-tab-documents"
        >
          Documents ({documents.length})
        </button>
        <button
          onClick={() => setActiveVaultTab('tasks')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
            activeVaultTab === 'tasks'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          id="vault-tab-tasks"
        >
          Tasks ({requirementTasks.length})
        </button>
        <button
          onClick={() => setActiveVaultTab('budget')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
            activeVaultTab === 'budget'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          id="vault-tab-budget"
        >
          Budget (${totalBudgetSpend.toLocaleString()})
        </button>
      </div>

      {/* TAB 1: DOCUMENTS */}
      {activeVaultTab === 'documents' && (
        <div className="space-y-6 animate-fade-in" id="vault-documents-section">
          
          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            
            {/* 1. Mortgage */}
            <div
              onClick={() => setCategoryFilter(categoryFilter === 'Mortgage' ? 'ALL' : 'Mortgage')}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                categoryFilter === 'Mortgage'
                  ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-200'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#E3F4EA] text-[#2D7048] flex items-center justify-center flex-shrink-0">
                <Banknote className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Mortgage</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{getDocCountForCat('Mortgage')} files</p>
              </div>
            </div>

            {/* 2. Legal */}
            <div
              onClick={() => setCategoryFilter(categoryFilter === 'Legal' ? 'ALL' : 'Legal')}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                categoryFilter === 'Legal'
                  ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-200'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Legal</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{getDocCountForCat('Legal')} files</p>
              </div>
            </div>

            {/* 3. Insurance */}
            <div
              onClick={() => setCategoryFilter(categoryFilter === 'Insurance' ? 'ALL' : 'Insurance')}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                categoryFilter === 'Insurance'
                  ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-200'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#FDF0EC] text-[#E05326] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Insurance</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{getDocCountForCat('Insurance')} files</p>
              </div>
            </div>

            {/* 4. Utilities */}
            <div
              onClick={() => setCategoryFilter(categoryFilter === 'Utilities' ? 'ALL' : 'Utilities')}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                categoryFilter === 'Utilities'
                  ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Utilities</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{getDocCountForCat('Utilities')} files</p>
              </div>
            </div>

            {/* 5. Inspection */}
            <div
              onClick={() => setCategoryFilter(categoryFilter === 'Inspection' ? 'ALL' : 'Inspection')}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                categoryFilter === 'Inspection'
                  ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Inspection</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{getDocCountForCat('Inspection')} files</p>
              </div>
            </div>

            {/* 6. Receipts */}
            <div
              onClick={() => setCategoryFilter(categoryFilter === 'Receipts' ? 'ALL' : 'Receipts')}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                categoryFilter === 'Receipts'
                  ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Receipt className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Receipts</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{getDocCountForCat('Receipts')} files</p>
              </div>
            </div>

          </div>

          {/* Documents Header Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                {categoryFilter === 'ALL' ? 'All Shared Documents' : `${categoryFilter} Documents`}
              </h2>
              <p className="text-xs text-slate-500">
                {categoryFilter === 'ALL' 
                  ? 'Viewing all uploaded conveyancing, loan, and settlement papers' 
                  : `Filtered by category: ${categoryFilter}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {categoryFilter !== 'ALL' && (
                <button
                  onClick={() => setCategoryFilter('ALL')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Show All Files
                </button>
              )}
            </div>
          </div>

          {/* List of Visible Documents */}
          {visibleDocuments.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white space-y-3">
              <div className="w-12 h-12 bg-orange-50 text-[#de5d26] rounded-2xl flex items-center justify-center mx-auto">
                <FileUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">No documents in this category yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Click the &quot;Upload Document&quot; button above to add legal papers, loan offers, or inspection certificates.
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#de5d26] hover:bg-[#c84617] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload First File</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  id={`doc-card-${doc.id}`}
                >
                  <div className="space-y-2.5">
                    {/* Top row: badge & actions */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-lg">
                        {doc.fileCategory}
                      </span>
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${getStatusStyle(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>

                    {/* File Title */}
                    <div className="flex items-start space-x-3 pt-1">
                      <div className="p-2.5 bg-orange-50 text-[#de5d26] rounded-xl flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate" title={doc.fileName}>
                          {doc.fileName}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {doc.fileSize} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Notes if any */}
                    {doc.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                        &quot;{doc.notes}&quot;
                      </p>
                    )}

                    {/* Sharing Pill Badges */}
                    <div className="text-xs text-slate-500 flex items-center space-x-1.5 flex-wrap gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="font-semibold text-slate-700">Shared with:</span>
                      {doc.sharedWith.map(role => (
                        <span key={role} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownloadDoc(doc)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-[#FAF8F5] hover:bg-orange-50 text-slate-700 hover:text-[#de5d26] rounded-lg text-xs font-semibold border border-slate-200 transition cursor-pointer"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="flex items-center space-x-1 px-2.5 py-1.5 text-slate-500 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-100 transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {/* Review status trigger for professionals */}
                      {!isBuyer && onUpdateStatus && (
                        <button
                          onClick={() => {
                            setReviewDoc(doc);
                            setReviewStatus(doc.status);
                            setReviewNotes(doc.notes || '');
                          }}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Audit Status
                        </button>
                      )}

                      {/* Delete button */}
                      {onDeleteDocument && (currentUser.role === 'Super Admin' || isBuyer) && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete document "${doc.fileName}"?`)) {
                              onDeleteDocument(doc.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: TASKS */}
      {activeVaultTab === 'tasks' && (
        <div className="space-y-4 animate-fade-in" id="vault-tasks-section">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Settlement Requirements & Milestones</h3>
                <p className="text-xs text-slate-500">Track and toggle pre-settlement conditions in real-time.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                {requirementTasks.filter(t => t.status === 'Done').length} / {requirementTasks.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {requirementTasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => handleToggleTaskStatus(task.id)}
                  className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/80 rounded-2xl border border-slate-200/60 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                      task.status === 'Done' 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : task.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-600 border-blue-300' 
                        : 'bg-white border-slate-300'
                    }`}>
                      {task.status === 'Done' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold ${task.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                    task.status === 'Done'
                      ? 'bg-emerald-100 text-emerald-800'
                      : task.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BUDGET */}
      {activeVaultTab === 'budget' && (
        <div className="space-y-4 animate-fade-in" id="vault-budget-section">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Settlement Cost & Fee Planner</h3>
                <p className="text-xs text-slate-500">Record LIM fees, legal retainers, building inspection & valuation invoices.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Spend</span>
                  <span className="text-lg font-black text-slate-900">${totalBudgetSpend.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setShowAddBudgetModal(true)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#de5d26] hover:bg-[#c84617] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Expense</span>
                </button>
              </div>
            </div>

            {budgetItems.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 rounded-2xl">
                <DollarSign className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No settlement expenses tracked yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {budgetItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.category} • {item.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-extrabold text-slate-900">${item.amount.toLocaleString()}</span>
                      <button
                        onClick={() => handleDeleteBudgetItem(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: REAL WORKING DOCUMENT UPLOAD */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5 animate-fade-in max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#de5d26] text-white rounded-xl">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upload to Document Vault</h3>
                  <p className="text-[11px] text-slate-500">AES-256 Encrypted & Role Protected</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              
              {/* Drag and drop interactive zone */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-[#de5d26] bg-orange-50/50 scale-102' 
                    : selectedFileObj 
                    ? 'border-emerald-300 bg-emerald-50/40' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileInputChange} 
                  className="hidden" 
                  id="vault-actual-file-input"
                />

                {selectedFileObj ? (
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900 truncate max-w-xs mx-auto">{selectedFileObj.name}</p>
                      <p className="text-[11px] text-emerald-700">{formatFileSize(selectedFileObj.size)} • Click to choose different file</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-orange-100 text-[#de5d26] rounded-full flex items-center justify-center mx-auto">
                      <FileUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Drag and drop file here, or <span className="text-[#de5d26] underline">browse</span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supports PDF, PNG, JPG, DOCX up to 25MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Document Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Document Title <span className="text-[#de5d26]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Bank_PreApproval_Letter.pdf"
                  className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white"
                  id="upload-filename-input"
                />
              </div>

              {/* Category and File Size */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={fileCategory}
                    onChange={(e) => setFileCategory(e.target.value as DocumentCategory)}
                    className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 font-semibold bg-white"
                    id="upload-category-select"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    File Size
                  </label>
                  <input
                    type="text"
                    value={fileSizeStr}
                    onChange={(e) => setFileSizeStr(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Share With Roles Checklist */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-[#de5d26]" />
                    Share With Professional Team:
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold text-[#de5d26]">
                    <input
                      type="checkbox"
                      checked={shareAll}
                      onChange={(e) => handleToggleShareAll(e.target.checked)}
                      className="rounded text-[#de5d26] focus:ring-[#de5d26]"
                      id="share-all-checkbox"
                    />
                    <span>Full Team</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  {(['Mortgage Adviser', 'Property Lawyer', 'Real Estate Agent', 'Super Admin'] as UserRole[]).map((role) => (
                    <label key={role} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shareAll || selectedRoles.includes(role)}
                        disabled={shareAll}
                        onChange={() => handleToggleRole(role)}
                        className="rounded text-[#de5d26] focus:ring-[#de5d26]"
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Optional Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., Updated 2026 mortgage pre-approval certificate from ANZ bank."
                  className="block w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#de5d26] hover:bg-[#c84617] text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 shadow-md shadow-orange-600/20"
                  id="confirm-upload-paper-btn"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Upload</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Budget Expense */}
      {showAddBudgetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 space-y-5 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#FDF0EC] text-[#E05326] rounded-xl">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Add Budget Expense</h3>
              </div>
              <button onClick={() => setShowAddBudgetModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBudgetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  value={budgetTitle}
                  onChange={(e) => setBudgetTitle(e.target.value)}
                  placeholder="E.g. LIM Report, Legal Conveyancing, Building Inspection"
                  className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800"
                  id="budget-title-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={budgetCategory}
                    onChange={(e) => setBudgetCategory(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 font-medium"
                    id="budget-category-select"
                  >
                    <option value="Legal">Legal</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value ? Number(e.target.value) : '')}
                    placeholder="450"
                    className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 font-bold"
                    id="budget-amount-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={budgetDate}
                  onChange={(e) => setBudgetDate(e.target.value)}
                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBudgetModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#de5d26] hover:bg-[#c84617] text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1 shadow-xs"
                  id="confirm-add-expense-btn"
                >
                  <span>Add Expense</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Preview Paper Details */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-[#de5d26]" />
                <h3 className="text-base font-bold text-slate-900">Document Overview</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="font-bold text-slate-900 text-sm mb-1">{previewDoc.fileName}</div>
                <div className="text-slate-500">Category: <strong className="text-slate-700">{previewDoc.fileCategory}</strong></div>
                <div className="text-slate-500">File Size: {previewDoc.fileSize}</div>
                <div className="text-slate-500">Uploaded: {new Date(previewDoc.uploadDate).toLocaleString()}</div>
              </div>

              <div className="p-3.5 bg-orange-50/60 border border-orange-100 rounded-2xl text-orange-900">
                <div className="font-bold mb-0.5">Verification Status: {previewDoc.status}</div>
                <p className="text-[11px] text-orange-800">{previewDoc.notes || 'No review notes attached yet.'}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Shared Target Team Members:</span>
                <div className="flex flex-wrap gap-1">
                  {previewDoc.sharedWith.map(role => (
                    <span key={role} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-[10px] font-semibold border">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => handleDownloadDoc(previewDoc)}
                className="px-4 py-2.5 bg-[#de5d26] text-white rounded-xl text-xs font-bold hover:bg-[#c84617] transition cursor-pointer flex items-center space-x-1.5 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Professional Review Paper */}
      {reviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Audit Client Paper</h3>
              </div>
              <button onClick={() => setReviewDoc(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReviewStatus} className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-800">{reviewDoc.fileName}</span>
                <span className="block text-slate-500 mt-0.5">Uploaded by: {reviewDoc.buyerName} ({reviewDoc.fileCategory})</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Set Audit Verification Status</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as any)}
                  className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Shared">Shared (Pending Audit)</option>
                  <option value="Under Review">Under Active Review</option>
                  <option value="Verified">Verified & Approved</option>
                  <option value="Requires Update">Requires Re-upload / Update</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Feedback Notes for Buyer</label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="E.g., Tax returns verified for 2024 and 2025 income assessment."
                  className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewDoc(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition cursor-pointer shadow-xs"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
