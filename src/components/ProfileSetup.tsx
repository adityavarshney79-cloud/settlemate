/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Lock,
  Phone, 
  DollarSign, 
  MapPin, 
  Clock, 
  Home, 
  ArrowLeft, 
  CheckCircle,
  Save,
  Camera,
  Upload,
  Trash2,
  Sparkles,
  Link as LinkIcon,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { User, BuyerProfile, UserRole } from '../types';

// Preset high-quality avatar photos for quick selection
const PRESET_AVATARS = [
  { id: 'av-1', label: 'Home Buyer (Alex)', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-2', label: 'Home Buyer (Clara)', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'Adviser Specialist', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Legal Counsel', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'Real Estate Agent', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-6', label: 'Professional Executive', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-7', label: 'NZ Resident', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80' },
  { id: 'av-8', label: 'Corporate Lead', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80' },
];

interface ProfileSetupProps {
  currentUser: User | null;
  onSaveProfile: (profileData: {
    name: string;
    email?: string;
    password?: string;
    phone: string;
    role: UserRole;
    avatarUrl?: string;
    buyerDetails?: BuyerProfile;
  }) => void;
  onNavigate: (view: string) => void;
}

export default function ProfileSetup({ currentUser, onSaveProfile, onNavigate }: ProfileSetupProps) {
  const isEditing = !!currentUser;

  // Form states strictly ordered
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [role, setRole] = useState<UserRole>(currentUser?.role || 'Home Buyer');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');

  // Buyer-specific states
  const [budget, setBudget] = useState(currentUser?.buyerDetails?.budget || 1650000);
  const [desiredLocation, setDesiredLocation] = useState(currentUser?.buyerDetails?.desiredLocation || 'Remuera, Auckland, NZ');
  const [propertyType, setPropertyType] = useState(currentUser?.buyerDetails?.propertyType || 'Standalone house');
  const [preferredTimeline, setPreferredTimeline] = useState(currentUser?.buyerDetails?.preferredTimeline || '3-6 Months');

  // Replacement checkboxes at bottom as explicitly requested
  const [agreeInformationSharing, setAgreeInformationSharing] = useState(false);
  const [agreeTermsConditions, setAgreeTermsConditions] = useState(false);

  // Custom URL input toggle
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // File upload reader
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setAvatarUrl(customUrlInput.trim());
      setCustomUrlInput('');
      setShowUrlInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your Full Name.');
      return;
    }

    if (!isEditing && !email.trim()) {
      setError('Please enter a valid Email address.');
      return;
    }

    if (!isEditing && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!isEditing && (!agreeInformationSharing || !agreeTermsConditions)) {
      setError('Please agree to the Information Sharing terms and Terms & Conditions to create your account.');
      return;
    }

    if (!isEditing && role === 'Super Admin') {
      setError('Super Admin accounts cannot be registered publicly. They must be provisioned internally.');
      return;
    }

    const buyerDetails: BuyerProfile | undefined = role === 'Home Buyer' ? {
      budget: Number(budget),
      desiredLocation,
      propertyType,
      preferredTimeline
    } : undefined;

    onSaveProfile({
      name: name.trim(),
      email: email.trim() || undefined,
      password: password || undefined,
      phone: phone.trim(),
      role,
      avatarUrl,
      buyerDetails
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen relative py-8 px-4 sm:px-6 lg:px-8 text-slate-800 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&fit=crop&q=80')`
      }}
      id="profile-setup-container"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(isEditing ? 'dashboard' : 'login')}
            className="flex items-center text-xs font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
            id="profile-back-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>{isEditing ? 'Back to Portal' : 'Back to Sign In'}</span>
          </button>
          
          <div className="flex items-center space-x-2 text-white">
            <div className="w-7 h-7 bg-[#de5d26] rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-black tracking-tight drop-shadow-sm">SettleMate</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl overflow-hidden" id="profile-form-card">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 relative">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-[#de5d26] text-white rounded-xl">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {isEditing ? 'Configure User Profile' : 'Create Account'}
                </h1>
                <p className="text-slate-300 text-xs mt-0.5">
                  One Journey. One Coordinator. Set up your settlement profile.
                </p>
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div className="m-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center space-x-2 animate-fade-in" id="profile-save-toast">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold">Profile successfully saved! Redirecting to your dashboard...</span>
            </div>
          )}

          {error && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start space-x-2 animate-shake" id="profile-error-alert">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* STEP 1: Main Credentials ordered as requested */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-[#de5d26]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <UserIcon className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white placeholder-slate-400 transition"
                      id="profile-name-input"
                    />
                  </div>
                </div>

                {/* 2. Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email <span className="text-[#de5d26]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={isEditing}
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white placeholder-slate-400 transition disabled:bg-slate-50 disabled:text-slate-500"
                      id="profile-email-input"
                    />
                  </div>
                </div>

                {/* 3. Password (Min 6 characters) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password (Min 6 characters) {!isEditing && <span className="text-[#de5d26]">*</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required={!isEditing}
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isEditing ? 'Leave blank to keep current' : 'Min 6 characters'}
                      className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white placeholder-slate-400 transition"
                      id="profile-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1 focus:outline-none cursor-pointer"
                      id="toggle-reg-password-btn"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 4. Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+64 21 000 0000"
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white placeholder-slate-400 transition"
                      id="profile-phone-input"
                    />
                  </div>
                </div>

                {/* 5. "I am" Role Selection as requested */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    I am <span className="text-[#de5d26]">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white"
                    id="profile-role-select"
                  >
                    <option value="Home Buyer">Home Buyer</option>
                    <option value="Mortgage Adviser">Mortgage Adviser</option>
                    <option value="Property Lawyer">Property Lawyer</option>
                    <option value="Real Estate Agent">Real Estate Agent</option>
                    {isEditing && currentUser?.role === 'Super Admin' && (
                      <option value="Super Admin">Super Admin</option>
                    )}
                  </select>
                  {!isEditing && (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Super Admin accounts can only be provisioned internally by platform administrators.
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* STEP 2: Buyer specific details */}
            {role === 'Home Buyer' && (
              <div className="space-y-4 pt-2 border-t border-slate-100 animate-fade-in" id="buyer-details-section">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Home Buying Preferences
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Maximum Purchase Budget ($)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        placeholder="1650000"
                        className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white"
                        id="profile-budget-input"
                      />
                    </div>
                  </div>

                  {/* Desired Location */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Location / Suburb</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <MapPin className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={desiredLocation}
                        onChange={(e) => setDesiredLocation(e.target.value)}
                        placeholder="E.g. Remuera, Auckland or Ponsonby, NZ"
                        className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white"
                        id="profile-location-input"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Property Type Preference</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Home className="w-4 h-4 text-slate-400" />
                      </div>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white font-medium"
                        id="profile-type-select"
                      >
                        <option value="Standalone house">Standalone house</option>
                        <option value="Town house">Town house</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Lifestyle house">Lifestyle house</option>
                      </select>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Timeline</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Clock className="w-4 h-4 text-slate-400" />
                      </div>
                      <select
                        value={preferredTimeline}
                        onChange={(e) => setPreferredTimeline(e.target.value)}
                        className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] text-slate-800 bg-white font-medium"
                        id="profile-timeline-select"
                      >
                        <option value="Immediate">Immediate (Under 1 month)</option>
                        <option value="1-3 Months">1-3 Months</option>
                        <option value="3-6 Months">3-6 Months</option>
                        <option value="6-12 Months">6-12 Months</option>
                        <option value="Just Browsing">Just Browsing / Researching</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Profile Avatar Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3" id="profile-picture-section">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase flex items-center">
                  <Camera className="w-4 h-4 mr-1.5 text-[#de5d26]" />
                  <span>Profile Photo (Optional)</span>
                </span>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('')}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center font-semibold cursor-pointer"
                    id="remove-avatar-btn"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200 flex items-center justify-center flex-shrink-0">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt={name || 'Profile'} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-100 flex items-center justify-center text-[#de5d26] font-bold text-xl uppercase">
                      {name ? name.charAt(0) : <UserIcon className="w-8 h-8 text-[#de5d26]" />}
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-2xs transition cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileUpload} 
                        className="hidden" 
                        id="avatar-file-input"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs rounded-xl transition cursor-pointer"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>URL</span>
                    </button>
                  </div>

                  {showUrlInput && (
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="url"
                        placeholder="Paste image URL (https://...)"
                        value={customUrlInput}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#de5d26] bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCustomUrl}
                        className="px-3 py-1.5 bg-[#de5d26] text-white rounded-lg text-xs font-semibold hover:bg-orange-700 transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {/* Preset avatar circles */}
                  <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
                    <span className="text-[10px] font-bold text-slate-400 mr-1 flex items-center">
                      <Sparkles className="w-3 h-3 text-amber-500 mr-0.5" />
                      Presets:
                    </span>
                    {PRESET_AVATARS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setAvatarUrl(preset.url)}
                        title={preset.label}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition cursor-pointer hover:scale-110 flex-shrink-0 ${
                          avatarUrl === preset.url 
                            ? 'border-[#de5d26] ring-2 ring-orange-300' 
                            : 'border-slate-200'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MANDATORY CHECKBOXES: Exactly as explicitly specified in prompt */}
            <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200/80 space-y-3" id="mandatory-terms-section">
              
              {/* Checkbox 1 */}
              <div className="flex items-start space-x-3">
                <input
                  id="agree-info-sharing"
                  type="checkbox"
                  checked={agreeInformationSharing}
                  onChange={(e) => setAgreeInformationSharing(e.target.checked)}
                  required={!isEditing}
                  className="h-4 w-4 text-[#de5d26] focus:ring-[#de5d26] border-slate-300 rounded mt-0.5 cursor-pointer"
                />
                <label htmlFor="agree-info-sharing" className="text-xs text-slate-800 leading-relaxed cursor-pointer select-none">
                  <span className="font-bold text-slate-900 block">
                    I agree to the Information Sharing & Coordination terms.
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    I authorize SettleMate to share relevant personal information and documents with service providers involved in my requested home-buying, settlement and move-in services.
                  </span>
                </label>
              </div>

              {/* Checkbox 2 */}
              <div className="flex items-start space-x-3 pt-2 border-t border-orange-200/60">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTermsConditions}
                  onChange={(e) => setAgreeTermsConditions(e.target.checked)}
                  required={!isEditing}
                  className="h-4 w-4 text-[#de5d26] focus:ring-[#de5d26] border-slate-300 rounded mt-0.5 cursor-pointer"
                />
                <label htmlFor="agree-terms" className="text-xs font-bold text-slate-900 cursor-pointer select-none">
                  I agree to the SettleMate Terms & Conditions.
                </label>
              </div>

            </div>

            {/* Create Account Button as requested */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#de5d26] hover:bg-[#c84617] transition active:scale-98 duration-150 cursor-pointer shadow-lg shadow-orange-600/20"
                id="create-account-submit-btn"
              >
                <Save className="w-4 h-4 mr-2" />
                <span>{isEditing ? 'Save Changes' : 'Create Account'}</span>
              </button>
            </div>

            {/* At bottom: Already have an account? Sign in */}
            <div className="text-center pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-xs font-bold text-[#de5d26] hover:text-[#c84617] transition cursor-pointer block mx-auto"
                id="profile-sign-in-link"
              >
                Already have an account? Sign in
              </button>
              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-slate-600 underline cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigate('csa')}
                  className="hover:text-[#de5d26] font-semibold text-slate-500 underline cursor-pointer"
                  title="Customer Service Agreement"
                >
                  CSA
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-slate-600 underline cursor-pointer"
                >
                  Disclaimer
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
